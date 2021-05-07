const tasksCtrl = {};
const Task = require('../models/Task');

tasksCtrl.renderTaskForm = (req, res) => {
    res.render('tasks/new-task')
};

tasksCtrl.createNewTask = async (req, res) => {
    const { title, description, date } = req.body;
    const newTask = new Task({title, date, description});
    newTask.user = req.user.id;
    await newTask.save();
    req.flash('success_msg', 'Task Added Successfully')
    res.redirect('/tasks')
};

tasksCtrl.renderTasks = async (req, res) => {
    const tasks = await Task.find({user: req.user.id}).sort({date: 'asc'});
    if(task.user != req.user.id) {
        req.flash('success_msg', 'You are not Authorized');
        res.redirect('/tasks')
    }
    res.render('tasks/all-tasks', { tasks })
};

tasksCtrl.renderEditForm = async (req, res) => {
    const task = await Task.findById(req.params.id)
    if(task.user != req.user.id) {
        req.flash('success_msg', 'You are not Authorized');
        res.redirect('/tasks')
    }
    res.render('tasks/edit-task', {task})
};

tasksCtrl.updateTask = async (req, res) => {
    const { title, description, date } = req.body;
    await Task.findByIdAndUpdate(req.params.id, { title, description, date });
    if(task.user != req.user.id) {
        req.flash('success_msg', 'You are not Authorized');
        res.redirect('/tasks')
    }
    req.flash('success_msg', 'Task Updated Successfully');
    res.redirect('/tasks')
};
tasksCtrl.deleteTask = async (req, res) => {
    await Task.findByIdAndDelete(req.params.id)
    if(task.user != req.user.id) {
        req.flash('success_msg', 'You are not Authorized');
        res.redirect('/tasks')
    }
    req.flash('success_msg', 'Task Deleted Successfully');
    res.redirect('/tasks')
}


module.exports = tasksCtrl;





