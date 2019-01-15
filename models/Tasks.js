const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TasksSchema = new Schema({
    task: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
});

const Tasks = mongoose.model('Tasks', TasksSchema);
module.exports = Tasks;
