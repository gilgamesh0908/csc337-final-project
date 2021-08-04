const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser'); //npm install cookie-parser
const crypto = require('crypto');
const app = express();
const db = mongoose.connection;
const mongoDBURL = 'mongodb://127.0.0.1/job'; // the name of the collection is "job"
const iterations = 1000;

var sessionKeys = {};

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
    phoneNum: String,
    education: String,
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
    console.log('session update function');
    let now = Date.now();
    for (e in sessionKeys) {
      if (sessionKeys[e][1] < (now - 20000)) {
        delete sessionKeys[e];
      }
    }
}
setInterval(updateSessions, 2000); //change later

app.use(cookieParser());
app.use('/', express.static('public_html'));
app.use('/user.html', authenticate); // not sure
app.get('/job/search/:companyName', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    let keyword = new RegExp(decodeURIComponent(req.params.companyName));
    Job.find({compName: keyword}).exec(function(error, results){
        res.send(JSON.stringify(results));
    })
});
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
app.get('/login/logIn/:username/:password', (req, res) => {
    let u = req.params.username;
    User.find({username: u}).exec(function(error, results){
        if(results.length == 1){ // there's no more than one account
            let p = req.params.password;
            var salt = results[0].salt;
            crypto.pbkdf2(password, salt, iterations, 64, 'sha512', (err, hash) => {
                if (err) throw err;
                let hashStr = hash.toString('base64');
                
                if(results[0].hash == hashStr){
                    let sessionkey = Math.floor(Math.random() * 1000);
                    sessionKeys[u] = [sessionkey, Date.now()];
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
app.post('/login/create/:username/:password/:email', (req, res) => {
    let u = req.params.username;
    let e = req.params.email;
    User.find({username: u}).exec(function(error, results){
        if(results.length == 0){ // if the username doesn't exist
            let p = req.params.password;
            var salt = crypto.randomBytes(64).toString('base64');
            crypto.pbkdf2(password, salt, iterations, 64, 'sha512', (err, hash) => {
                if (err) throw err;
                let hashStr = hash.toString('base64');
                console.log(hashStr);
                var user = new User({'username': u, 'salt': salt, 'hash': hashStr, 'email': e});
                user.save(function (err) {if (err) console.log('an error occurred'); });
                res.send('account created');
            });
        }else{
            res.send('username already taken');
        }
    });
});
//todo: continue here
app.post('/home/create', (req, res) => {
    let resumeObj = req.body;
    var r = mongoose.model('Resume', ResumeSchema);
    r.find({})
});
app.get('/home/view', (req,res) => {

});

// ----below url could check/add the data----
app.post('/add/job', (req, res) => {
    let jobObj = req.body;
    var j = mongoose.model('Job', JobSchema);
    j.find({jobTitle: jobObj.jTitle, compName: jobObj.compName}).exec(function(error, results){
        if(results.length == 0){ // if doesn't exist
            var job = new Job(jobObj);
            job.save(function(err) {if(err) console.log('fail to add');});
            console.log("finish adding the job");
        }
    })
});
app.get('/get/users', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var u = mongoose.model('User', UserSchema);
    u.find({}).exec(function(error, results){
        res.send(JSON.stringify(results, null, 4));
    });
});
app.get('/get/jobs', (req, res) => {
    res.setHeader('Content-Type', 'text/plain');
    var j = mongoose.model('Job', JobSchema);
    j.find({}).exec(function(error, results){
        res.send(JSON.stringify(results, null, 4));
    });
});
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