const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config').get(process.env.NODE_ENV);

mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
});
mongoose.set('useFindAndModify', false);

const { User } = require('./models/user');
const { Log } = require('./models/log');
const { auth } = require('./middleware/auth');

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(__dirname + '/public'));
console.log(__dirname);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/../client/build'));
}
// API routes
// DEMO get users
app.get('/api/users', (req,res) => {
    User.find({}, (err, users) => {
        if (err) return res.status(400).send({ message : 'Error has occured'});
        res.status(200).send(users)
    })
})
// User authentication
app.get('/api/auth', auth, (req, res) => {
    res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    })
})

// Register
app.post('/api/users', (req,res) => {
    const user = new User(req.body);
    user.save( (err, doc) => {
        if (err) return res.status(400).send({success: false, error: err});
        res.status(200).send({
            success: true,
            user:doc
        })

    })
})

// Login
app.post('/api/login', (req,res) => {
    User.findOne({'email': req.body.email}, (err, user) => {
        if (!user) return res.send({isAuth: false, message: "User not found"});
        user.comparePassword( req.body.password, (err, isMatch) => {
            if (err || !isMatch) return res.send({isAuth: false, message: "Wrong password"});
            user.generateToken( (err,user) => {
                if (err) return res.status(400).send(err);
                res.cookie('auth',user.token).send({
                    isAuth: true,
                    id: user._id,
                    email: user.email
                });
            }) 
        })
    })
})

// Logout
app.get('/api/logout', auth, (req,res)=> {
    req.user.deleteToken(req.token, (err,user) => {
        if (err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

// Edit account
app.post('/api/editAccount', (req,res) => {
    User.findByIdAndUpdate(req.body._id, req.body, {new: true}, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})

// Get user details for account editing
app.get('/api/getUser', (req,res) => {
    User.findById(req.query.id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json({
            success: true,
            doc
        })
    })
})

// Change password
app.post('/api/changePassword', (req,res) => {
    User.findById(req.body._id, (err, user) => {
        if (!user) return res.status(400).send("User not found");
        user.comparePassword(req.body.oldpassword, (err, isMatch) => {
            if (err) return res.status(400).send('Error comparing the passwords');
            if (!isMatch) return res.status(200).send({error: true, message: 'Wrong password'});
            if (isMatch) {
                user.password = req.body.newpassword;
                user.save( (err) => {
                    if (err) return res.status(500).send("Error updating password");
                    return res.status(200).send({error: false, message: "Password was updated"});
                })
            }
        });
    })
});

// Delete account 
app.delete('/api/deleteAccount', (req,res) => {
    const id = req.query.id
    User.findByIdAndRemove(id, (err,doc) => {
        if (err) return res.status(500).send(err);
        res.json("User was deleted");
    })
});

// LOG ROUTES
// Post Log
app.post('/api/postLog', (req, res)=> {
    const dateOfLog = req.body.date;
    const timingOfLog = req.body.timing;
    Log.find({ownerId : req.body.ownerId, date : dateOfLog, timing: timingOfLog}, (err, doc) => {
        if (err) return res.status(400).send("Could not post the log");
        if (doc.length > 0) return res.status(400).send("Cant post new log yet");
        const log = new Log(req.body);
        log.save( (err, doc) => {
            if (err) return res.status(400).send({success: false, error: err});
            res.status(200).send({
                success: true,
                log: doc
            })
        })
    })
});

// Get log
app.get('/api/getLog', (req, res) => {
    const id = req.query.id;
    Log.findById(id, (err, doc) => {
        if (err) return res.status(400).send("Error finding log");
        if (doc.length > 0) return res.status(404).send("Log was not found");
        res.status(200).send({
            log: doc
        })
    })
})

// Get logs from user
app.get('/api/getLogs', (req, res) => {
    const user = req.query.id;
    let skip = req.query.skip ? parseInt(req.query.skip) : 0;
    let limit = req.query.limit ? parseInt(req.query.limit) : null;
    Log.find({ownerId : user }, (err, doc) => {
        if (err) return res.status(400).send("There was an error finding logs");
        if (doc.length === 0) return res.status(200).send("No logs found");
        res.status(200).send(doc);
    }).sort({'createdAt' : -1}).skip(skip).limit(limit);
})


// Check if it is available to log
app.post('/api/canLog', (req, res) => {
    const currentDate = req.body.date;
    const currentTiming = req.body.timing;
    const user = req.body.userId
    Log.findOne({ownerId: user, date: currentDate, timing: currentTiming}, (err, doc) => {
        if (err) return res.status(400).send("Error checking the database");
        if (doc === null && user) return res.status(200).send({ canLog: true, message: "Can log"});
        res.status(200).send({canLog : false, message: "Cant post new logs yet"});
    })
})

app.listen(config.PORT, () => {
    console.log('App is listening on port ' + config.PORT)
});