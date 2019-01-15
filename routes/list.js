const express = require('express');
const router = express.Router();

const Task = require('../models/Tasks');

//All Tasks
router.get('/', (req, res) => {
    Task.find()
        .then(items => res.json(items));
});

//Add Task
router.post('/', (req, res) => {
    const newTask = new Task({
        task: req.body.task,
    });
    newTask.save().then(item => res.json(item));
});

//Delete Task
router.delete('/:id', (req,res) => {
    Task.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success: false}));

});

//Update Task
router.put('/:id', (req,res) => {
    Task.findById(req.params.id)
        .then(item => {
            item.task = req.body.task;
            item.save().then(item => res.json(item));
        }).catch(err=>res.status(404).json({success:false}));

});

module.exports = router;
