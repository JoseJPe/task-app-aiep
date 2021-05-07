const mongoose = require('mongoose');

const { TASK_APP_MONGODB_HOST, TASK_APP_MONGODB_DATABASE } = process.env;
const MONGODB_URI = `mongodb://${TASK_APP_MONGODB_HOST}/${TASK_APP_MONGODB_DATABASE}`;

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
})
    .then(db => console.log('Database is conected...'))
    .catch(err => console.log(err))
