import Checkbox from "./Checkbox";
import { useState } from "react";

// Task component to manage individual tasks
export default function Task({ name, done, onToggle, onTrash, onRename }) {
	const [editMode, setEditMode] = useState(false); // State to manage edit mode

	return (
		<div className={"task " + (done ? "done" : "")}>
			{/* Checkbox to mark task as done or not */}
			<Checkbox checked={done} onClick={() => onToggle(!done)} />

			{/* Display task name and toggle edit mode on click */}
			{!editMode && (
				<div className="task-name" onClick={() => setEditMode((prev) => !prev)}>
					<span>{name}</span>
				</div>
			)}

			{/* Form to rename the task when in edit mode */}
			{editMode && (
				<form
					onSubmit={(ev) => {
						ev.preventDefault(); // Prevent default form submission
						setEditMode(false); // Exit edit mode after submitting
					}}
				>
					<input
						type="text"
						value={name} // Current task name as input value
						onChange={(ev) => onRename(ev.target.value)} // Update task name on change
					/>
				</form>
			)}

			{/* Button to delete the task */}
			<button className="trash" onClick={onTrash}>
				<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
					<path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z" />
				</svg>
			</button>
		</div>
	);
}
