# csc337-final-project
# NOTE:
To start the server, you need://
```npm install express```
```npm install mongoose```
```npm install cookie-parser```
```npm install multer```
```npm install crypto```
Then,
```node server.js```
----

# 1. Overview

Since our group is at the time when we are about to graduate, we are planning to design a recruitment website. This will be more helpful for us to find a job after graduation.

The website we designed is an internal company job site where anyone can browse the information on this site. Job seekers can search for the job title and find the position they want within the site. By clicking on the task bar of a specific job, you can view the details of the job.

When job seekers want to submit a resume with the company, they can register as a user on thesite and also submit their jobresume with their self-account to introduce their basic information. The company provides users with a resume template, so users can fill in their information directly on the create a resume page, save and submit it. The resume information is also saved in the database and can be viewed on the view the resume page.


# 2. Frontend
## 2.1 Starting/Job Page (index.html)
Description: This page lists all jobs that companiesprovided. Ontheleft-handside,thelistshows thename ofthecompanies.

## 2.2 Loginpage(login.html)
Description: Whentheuserclicks "Login", one could login if one has the username; otherwise, create the account.

## 2.3 Home page (home.html)
Description: Whentheuserclicks "Home", onecouldcreatearesume/view theresume.

# 3. Backend
## 3.1 Preview
see in doc
## 3.2 server

### 3.2.1 npm modules

* mongoose
* express
* cookie-parser
* parser
* multer
### 3.2.2 database structure

#### 3.2.2.1 UserSchema

|**variable name**|**type**|**desc**|
|:----|:----|:----|
|username|String|the username of the user|
|password|String|the pwd of the user|
|email|String|the email of the user|

#### 3.2.2.2 ResumeSchema

|**variable name**|**type**|**desc**|
|:----|:----|:----|
|username|String|the username of the user|
|name|String|the real name of the user|
|phoneNum|String / Number|the phone number of the user|
|edu|String|the education background of the user|
|area|String|the interested area of the user|
|desc|String|the short self-description|

#### 3.2.2.3 JobSchema

|**variable name**|**type**|**desc**|
|:----|:----|:----|
|jobTitle|String|the job title of the job|
|compName|String|the company that offers the job|
|resumeLst|Array|the list of resume|

### 3.2.3routes

|**Job page(starting page)**|    |    |
|:----|:----|:----|
|**url**|**method**|**function**|
|'/job'|GET|TBA|
|'/job/search'|GET|searchJob()|
|'/job/apply'|POST|applyJob()|
|    |    |    |
|**Login page**|    |    |
|**url**|**method**|**function**|
|'/login'|GET|TBA|
|'/login/logIn'|GET|login()|
|'/login/create'|GET|createAcc()|
|    |    |    |
|**Home page**|    |    |
|**url**|**method**|**function**|
|'/home'|GET|TBA|
|'/home/create'|POST|createResume()|
|'/home/view'|GET|viewResume()|

# 4. Timeline

**4.1 Milestone 1**(before July 28/29)

Finish index.html, index.css, login.html, login.css, home.html, home.css.

**4.2 Milestone 2**(before August 3)

Finish index.js, login.js, home.js.

**4.3 Milestone 3**(before August8)

Finish server.js and record the demo video.

# Team

**Aerror Li**

Server and part of html + css

**Lingxiao Meng**

Client and part of html + css



