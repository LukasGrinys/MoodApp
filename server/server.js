const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config').get(process.env.NODE_ENV);
const path = require('path');

app.use(bodyParser.json());
app.use(cookieParser());
// app.use(express.static(__dirname + '/public'))
app.use(express.static(__dirname + '/../client/build')); 

const { auth } = require('./middleware/auth');

const { 
    registerNewUser,
    loginUser,
    logOutUser,
    editAccount,
    getUser,
    changePassword,
    deleteUser
} = require('./actions/user');

const {
  postLog,
  getLog,
  getLogs,
  canLog
} = require('./actions/log')

// API routes //
// USER ROUTES //

// API AUTH
app.get('/api/auth', auth, (req, res) => {
  res.json({
      isAuth: true,
      id: req.user.id,
      email: req.user.email,
      firstName: req.user.firstName,
      lastName: req.user.lastName
  })
})

// REGISTER
app.post('/api/users', async (req,res) => {
    const { error, success } = await registerNewUser(req.body);
    if (error || !success) return res.send({error : error || 'Error : Could not create account'});
    return res.status(200).send({ success, message : "User was successfully created" })
});

// LOGIN
app.post('/api/login', async (req,res) => {
    const { error, data } = await loginUser(req.body.email, req.body.password);
    if (error || !data) return res.send({error: error || 'Error : Could not log in'});
    return res.status(200).cookie('auth', data.token).send({
        isAuth: true,
        id: data.id,
        email: data.email
    })
})

// LOGOUT
app.get('/api/logout', auth, async (req,res)=> {
    const { error } = await logOutUser(req.token);
    if (error) return res.send({error});
    return res.status(200).send({success : true, message : 'User has signed out'});
})

// EDIT ACCOUNT
app.post('/api/editAccount', auth, async (req,res) => {
    const { error, success } = await editAccount(req.body.id, req.body);
    if (error || !success) return res.send({error : error || 'Error: Could not edit account details'});
    return res.status(200).send({success: true, message: 'Account was edited successfully'});
})

// GET USER DETAILS
app.get('/api/getUser', auth, async (req,res) => {
    const { error, data } = await getUser(req.query.id);
    if (error || !data) return res.send({error: error || 'Error: Could not get user details'});
    return res.send({data});
})

// CHANGE PASSWORD
app.post('/api/changePassword', async (req,res) => {
    const { error, success } = await changePassword(req.body.id, req.body.oldPassword, req.body.newPassword);
    if (error || !success) return res.send({error: error || 'Error: Could not change password'});
    return res.send({success: true, message : 'Password was changed'});
});

// DELETE ACCOUNT
app.post('/api/deleteAccount', async (req,res) => {
    const { error, success } = await deleteUser(req.query.id, req.body.password);
    if (error || !success) return res.send({error : error || 'Error: Could not delete user'});
    return res.send({success: true, message : 'User was deleted'});
});


// LOG ROUTES

// POST LOG
app.post('/api/postLog', auth, async (req, res)=> {
    const { error, success } = await postLog({ body: req.body});
    if (error || !success) return res.send({error : error || 'Could not post new log'})
    return res.status(200).send({success: true, message : 'Log posted successfully'})
});

// GET SINGLE LOG
app.get('/api/getLog', auth, async (req, res) => {
    const { error, data } = await getLog({id: req.query.id, userId: req.user.id});
    if (error || !data) return res.send({ error : error || 'Could not get log data'});
    return res.status(200).send({success : true, data })
})

// GET LOGS
app.get('/api/getLogs', auth, async (req, res) => {
    const { error, data } = await getLogs({
      userId : req.query.id,
      skip: req.query.skip ? parseInt(req.query.skip) : 0,
      limit: req.query.limit ? parseInt(req.query.limit) : null
    })

    if (error || !data) return res.send({error : error || 'Error : Could not get log data'});
    return res.status(200).send({success : true, data});
})


// CAN USER LOG
app.post('/api/canLog', auth, async(req, res) => {
    const { date, timing, userId } = req.body;
    const { error, data } = await canLog({date, timing, userId});
    if (error || !data) return res.send({error : error || 'Error : Could not check if user can log' })
    res.status(200).send({data});
});

// SERVE index.html 
app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, '/../client/build/index.html'), function(err) {
      if (err) {
        res.status(500).send(err);
      }
    })
})

app.listen(config.PORT, () => {
    console.log('App is listening on port ' + config.PORT)
});