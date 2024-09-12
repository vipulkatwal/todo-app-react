import { useState } from "react";

// TaskForm component to handle adding new tasks
export default function TaskForm({ onAdd }) {
	const [taskName, setTaskName] = useState(""); // State to manage the input value

	// Handle form submission
	function handleSubmit(ev) {
		ev.preventDefault(); // Prevent default form submission behavior
		onAdd(taskName); // Call onAdd with the current task name
		setTaskName(""); // Clear the input field after submission
	}

	return (
		<form onSubmit={handleSubmit}>
			{/* Button to submit the new task */}
			<button type="submit">+</button>

			{/* Input field for entering the new task */}
			<input
				type="text"
				value={taskName} // Controlled input value
				onChange={(ev) => setTaskName(ev.target.value)} // Update state on input change
				placeholder="Your next task..." // Placeholder text for the input field
			/>
		</form>
	);
}
