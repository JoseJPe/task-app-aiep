const { Router } = require('express');
const router = Router();

const { 
    renderTaskForm, 
    createNewTask, 
    renderTasks, 
    renderEditForm, 
    updateTask, 
    deleteTask
} = require('../controllers/tasks.controller');

const { isAuthenticated } = require('../helpers/auth')

// New task
router.get('/tasks/add', isAuthenticated, renderTaskForm);

router.post('/tasks/new-task', isAuthenticated, createNewTask);

// Get all task
router.get('/tasks', isAuthenticated, renderTasks);

// Edit Task
router.get('/tasks/edit/:id', isAuthenticated, renderEditForm);
router.put('/tasks/edit/:id',isAuthenticated, updateTask)

// Delete Task
router.delete('/tasks/delete/:id', isAuthenticated, deleteTask);


module.exports = router;