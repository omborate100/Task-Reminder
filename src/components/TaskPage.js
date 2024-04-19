import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TaskPage.css';  // Ensure you update this CSS with modal styles

function TaskPage() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isNewTask, setIsNewTask] = useState(true); // Track if the form is for new task or update
    const [newTask, setNewTask] = useState({ name: '', description: '', timeToRemind: '' });
    const [activeTaskId, setActiveTaskId] = useState(null);

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get('https://uxwpzekzjl.execute-api.eu-north-1.amazonaws.com/prod/api/task/all');
            setTasks(response.data);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    const handleInputChange = (event) => {
        setNewTask({ ...newTask, [event.target.name]: event.target.value });
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        try {
            const url = `https://uxwpzekzjl.execute-api.eu-north-1.amazonaws.com/prod/api/task${isNewTask ? '' : `?taskId=${activeTaskId}`}`;
            const method = isNewTask ? 'post' : 'put';
            await axios[method](url, newTask);
            setShowModal(false);
            setNewTask({ name: '', description: '', timeToRemind: '' });
            fetchTasks();
            setActiveTaskId(null);  // Reset active task
            setIsNewTask(true);  // Reset to new task mode
        } catch (error) {
            console.error('Error submitting task:', error);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            await axios.delete(`https://uxwpzekzjl.execute-api.eu-north-1.amazonaws.com/prod/api/task?taskId=${taskId}`);
            fetchTasks();
        } catch (error) {
            console.error('Error deleting task:', error);
        }
    };

    const handleCardClick = (task) => {
        setActiveTaskId(task.taskId);
        setShowModal(true);
        setIsNewTask(false);
        setNewTask({ name: task.name, description: task.description, timeToRemind: task.timeToRemind });
    };

    const openAddTaskModal = () => {
        setShowModal(true);
        setIsNewTask(true);
        setNewTask({ name: '', description: '', timeToRemind: '' });
    };

    return (
        <div>
            <nav className="navbar">
                <h1>Task Reminder App</h1>
                <div>
                    <a href="#home">Home</a>
                    <a href="#tasks">Tasks</a>
                    <a href="#about">About</a>
                </div>
            </nav>
            <div className="task-board">
                {tasks.map(task => (
                    <div key={task.taskId} className="task-card" onClick={() => handleCardClick(task)}>
                        <h3>{task.name}</h3>
                        <p>{task.description}</p>
                        <p><strong>Reminder in:</strong> {task.timeToRemind} minutes</p>
                        <button onClick={(e) => { e.stopPropagation(); handleDeleteTask(task.taskId); }} className="delete-task-button">
                            Delete Task
                        </button>
                    </div>
                ))}
                <button onClick={openAddTaskModal} className="add-task-button"></button>
            </div>
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={() => setShowModal(false)}>&times;</span>
                        <form onSubmit={handleFormSubmit}>
                            <label>Name</label>
                            <input type="text" name="name" value={newTask.name} onChange={handleInputChange} required />
                            <label>Description</label>
                            <input type="text" name="description" value={newTask.description} onChange={handleInputChange} required />
                            <label>Time to Remind (in minutes)</label>
                            <input type="number" name="timeToRemind" value={newTask.timeToRemind} onChange={handleInputChange} required />
                            <button type="submit">{isNewTask ? 'Add Task' : 'Update Task'}</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TaskPage;
