const express = require('express');
const mongoose = require('mongoose');
const parser = require('body-parser');
const cookieParser = require('cookie-parser'); //npm install cookie-parser
const crypto = require('crypto');
const db = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/job'; // the name of the collection is "job"
const iterations = 1000;

const app = express();
app.use(parser.json());
app.use(parser.urlencoded({ extended: true}));

var sessionKeys = {};
var nameList = [];

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    // password: String,  //todo: change, use salt&hash instead
    salt: String,
    hash: String,
    email: String,
});
var ResumeSchema = new Schema({
    username: String,
    name: String,
    gender: String,
    phoneNum: String,
    photo: String,
    education: String,
    birthday: String,
    area: String,
    desc: String,
});
var JobSchema = new Schema({
    jobTitle: String,
    compName: String,
    resumeList: Array,
});
var User = mongoose.model('User', UserSchema);
var Resume = mongoose.model('Resume', ResumeSchema);
var Job = mongoose.model('Job', JobSchema);

mongoose.connect(mongoDBURL, { useNewUrlParser: true });
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

function authenticate(req, res, next) {
    console.log(req.cookies);
    console.log(sessionKeys);
    if (Object.keys(req.cookies).length > 0) {
      let u = req.cookies.login.username;
      let key = req.cookies.login.key;
      if ( Object.keys(sessionKeys[u]).length > 0 && sessionKeys[u][0] == key) {
        next();
      } else {
        res.send('NOT ALLOWED');
      }
    } else {
      res.send('NOT ALLOWED');
    }
}

function updateSessions() {
    // console.log('session update function');
    let now = Date.now();
    for (e in sessionKeys) {
      if (sessionKeys[e][1] < (now - 20000)) {
        delete sessionKeys[e];
      }
    }
}
setInterval(updateSessions, 2000); //change later

app.use(cookieParser());
app.use(express.static('public_html'));
app.use('/user.html', authenticate); // not sure
app.use('/addJob.html', (req, res) => {
    let jobObj = req.body;
    console.log(jobObj);
    var j = mongoose.model('Job', JobSchema);
    j.find({jobTitle: jobObj.jTitle, compName: jobObj.compName}).exec(function(error, results){
        if(results.length == 0){ // if doesn't exist
            var job = new Job(jobObj);
            job.save(function(err) {if(err) console.log('fail to add');});
            console.log("finish adding the job");
        }
    })
 });
// search the job position by typing the company name 
app.get('/job/search/:companyName', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let keyword = new RegExp(decodeURIComponent(req.params.companyName));
    Job.find({compName: keyword}).exec(function(error, results){
        res.send(JSON.stringify(results));
    })
});
// apply for the job
app.post('/job/apply/:comp/:uname', (req, res) => {
    let jobObj = req.body;
    var j = mongoose.model('Job', JobSchema);
    var r = mongoose.model('Resume', ResumeSchema);
    j.find({compName: comp}).exec(function(error, results){
        if(results.length == 0){
            console.log("the user doesn't exist");
        }else{
            var resume = new Resume();
            let job = results[0];
            job.resumeList.push(resume);
            job.save();
            console.log("finish adding the resume into the job list");
        }
    })
});
// if has an account, login
app.get('/login/logIn/:username/:password', (req, res) => {
    let u = req.params.username;
    User.find({username: u}).exec(function(error, results){
        if(results.length == 1){ // there's no more than one account
            let p = req.params.password;
            var salt = results[0].salt;
            crypto.pbkdf2(p, salt, iterations, 64, 'sha512', (err, hash) => {
                if (err) throw err;
                let hashStr = hash.toString('base64');
                
                if(results[0].hash == hashStr){
                    let sessionkey = Math.floor(Math.random() * 1000);
                    sessionKeys[u] = [sessionkey, Date.now()];
                    nameList.push(u);
                    res.cookie("login", {username: u, key: sessionkey}, {maxAge: 20000});
                    res.send("succeed");
                }else{
                    res.send("fail");
                }
            });
        }else{
            res.send("fail");
        }
    });
});
// create the account [DONE, success to create the account]
app.post('/login/create/', (req, res) => {
    // console.log(req.body);
    let u = req.body.username;
    let e = req.body.email;
    User.find({username: u}).exec(function(error, results){
        if(results.length == 0){ // if the username doesn't exist
            let p = req.body.password;
            // console.log(p);
            var salt = crypto.randomBytes(64).toString('base64');
            crypto.pbkdf2(p, salt, iterations, 64, 'sha512', (err, hash) => {
                if (err) throw err;
                let hashStr = hash.toString('base64');
                // console.log(hashStr);
                // console.log(u);
                var user = new User({'username': u, 'salt': salt, 'hash': hashStr, 'email': e});
                user.save(function (err) {if (err) console.log('an error occurred'); });
                res.send('account created');
            });
        }else{
            res.send('username already taken');
        }
    });

    // let userObj = req.body;
    // console.log(userObj);
});
//todo: continue here
// create the resume
app.post('/home/create/', (req, res) => {
    req.params.username = nameList[0];
    console.log(req.params.username);
    if(req.params.username == undefined){
        res.send("Please log in");
    }else{
        // console.log('here');
        // console.log(req.body);
        let resumeObj = req.body;
        req.body.username = req.params.username;
        // console.log(req.body);
        // console.log(resumeObj);
        var r = mongoose.model('Resume', ResumeSchema);

        // use name & username to check whether already existed
        r.find({name: resumeObj.name, username: req.params.username}).exec(function(error, results){
            if(results.length == 0){ // if the resume doesnt exist
                var resume = new Resume(resumeObj);
                resume.save(function(err) {if(err) console.log('fail to add');});
                console.log('finish to add the resume into database');
            }else{
                // console.log('you already have the resume');
                res.send("exist");
            }
        });
    }
});
// view the resume
app.get('/home/view', (req,res) => {
    // find the username and return the data about that username
});

// ----below url could check/add the data----
// to add the job into the database
app.post('/add/job', (req, res) => {
    let jobObj = req.body;
    console.log(jobObj);
    var j = mongoose.model('Job', JobSchema);
    j.find({jobTitle: jobObj.jTitle, compName: jobObj.compName}).exec(function(error, results){
        if(results.length == 0){ // if doesn't exist
            var job = new Job(jobObj);
            job.save(function(err) {if(err) console.log('fail to add');});
            console.log("finish adding the job");
        }
    })
});

// to list all the users in the database
app.get('/get/users', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var u = mongoose.model('User', UserSchema);
    u.find({}).exec(function(error, results){
        res.send(JSON.stringify(results, null, 4));
    });
});
// to list all the jobs in the database
app.get('/get/jobs', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var j = mongoose.model('Job', JobSchema);
    j.find({}).exec(function(error, results){
        res.send(JSON.stringify(results, null, 4));
    });
});
// to list all the resume in the database
app.get('/get/resume', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var r = mongoose.model('Resume', ResumeSchema);
    r.find({}).exec(function(error, results){
        res.send(JSON.stringify(results, null, 4));
    });
});


const port = 3000;
app.listen(port, function(){
    console.log('server running');
});