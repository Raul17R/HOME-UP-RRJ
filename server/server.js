const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const taskRouter = require('./routes/tasks.router');
const addTaskRouter = require('./routes/addTask.router');
const editTask = require ('./routes/editTask.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/task', taskRouter);
app.use('/api/addTask', addTaskRouter);
app.use('/api/editTask', editTask);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5003;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
