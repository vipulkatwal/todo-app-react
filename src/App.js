import "./App.css";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { useEffect, useState } from "react";

function App() {
	// State to hold the list of tasks
	const [tasks, setTasks] = useState([]);

	// Effect to update localStorage whenever tasks change
	useEffect(() => {
		if (tasks.length === 0) return; // Skip if there are no tasks to avoid unnecessary storage operations
		localStorage.setItem("tasks", JSON.stringify(tasks)); // Save tasks to localStorage
	}, [tasks]);

	// Effect to load tasks from localStorage when the app loads for the first time
	useEffect(() => {
		const tasks = JSON.parse(localStorage.getItem("tasks")); // Retrieve tasks from localStorage
		setTasks(tasks || []); // Initialize tasks with stored tasks or an empty array
	}, []);

	// Function to add a new task
	function addTask(name) {
		setTasks((prev) => {
			return [...prev, { name: name, done: false }]; // Append new task to the existing list
		});
	}

	// Function to remove a task by index
	function removeTask(indexToRemove) {
		setTasks((prev) => {
			return prev.filter((taskObject, index) => index !== indexToRemove); // Filter out the task to be removed
		});
	}

	// Function to update the 'done' status of a task
	function updateTaskDone(taskIndex, newDone) {
		setTasks((prev) => {
			const newTasks = [...prev]; // Create a copy of the current tasks
			newTasks[taskIndex].done = newDone; // Update the 'done' status of the specified task
			return newTasks;
		});
	}

	// Calculate the number of completed tasks
	const numberComplete = tasks.filter((t) => t.done).length;
	const numberTotal = tasks.length;

	// Function to get the motivational message based on completion percentage
	function getMessage() {
		const percentage = (numberComplete / numberTotal) * 100;
		if (percentage === 0) {
			return "Try to do at least one! 🙏"; // Message when no tasks are done
		}
		if (percentage === 100) {
			return "Nice job for today! 🏝"; // Message when all tasks are done
		}
		return "Keep it going 💪🏻"; // Message for partial completion
	}

	// Function to rename a task by index
	function renameTask(index, newName) {
		setTasks((prev) => {
			const newTasks = [...prev]; // Create a copy of the current tasks
			newTasks[index].name = newName; // Update the name of the specified task
			return newTasks;
		});
	}

	// Render the main content of the app
	return (
		<main>
			<h1>
				{numberComplete}/{numberTotal} Complete
			</h1>
			<h2>{getMessage()}</h2>
			<TaskForm onAdd={addTask} />
			{tasks.map((task, index) => (
				<Task
					{...task}
					onRename={(newName) => renameTask(index, newName)}
					onTrash={() => removeTask(index)}
					onToggle={(done) => updateTaskDone(index, done)}
				/>
			))}
		</main>
	);
}

export default App;
