"use client";
import React, { useState } from "react";

type Task = {
  id: number;
  name: string;
  estimatedPomodoros: number;
  completedPomodoros: number;
  notes?: string; // Optional notes property
};

const TodoList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskName, setTaskName] = useState("");
  const [estPomodoros, setEstPomodoros] = useState(1);
  const [showNote, setShowNote] = useState(false); // To show/hide note input
  const [note, setNote] = useState(""); // To store the note content

  const addTask = () => {
    if (!taskName.trim()) return; // Don't add empty tasks

    const newTask: Task = {
      id: Date.now(), // Simple ID generation
      name: taskName,
      estimatedPomodoros: estPomodoros,
      completedPomodoros: 0,
      notes: note, // Add the note to the new task
    };
    setTasks([...tasks, newTask]);
    // Reset states
    setTaskName("");
    setEstPomodoros(1);
    setNote("");
    setShowNote(false);
  };

  return (
    <div className="max-w-lg mx-auto w-full">
      <h3 className="text-xl font-bold mb-4">Tasks</h3>
      <div className="flex flex-col mb-4 space-y-2">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex flex-col p-2 bg-gray-200 rounded mb-2"
          >
            <div className="flex items-center justify-between">
              <input type="checkbox" />
              <span className="mx-2">{task.name}</span>
              <span className="text-sm">{`${task.completedPomodoros}/${task.estimatedPomodoros}`}</span>
              <button type="button" className="hover:text-gray-800">
                {/* ...ellipsis icon */}
              </button>
            </div>
            {task.notes && (
              <div className="mt-2 p-2 bg-blue-100 rounded">
                {" "}
                {/* Note the bg-blue-100 */}
                <p className="text-gray-700 text-sm">{task.notes}</p>
              </div>
            )}
          </div>
        ))}
        <div className="p-2 bg-white rounded shadow">
          <input
            type="text"
            placeholder="What are you working on?"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            className="w-full text-gray-700 mb-2"
          />
          <div className="flex items-center justify-between">
            <label htmlFor="estPomodoros" className="text-gray-700">
              Est Pomodoros
            </label>
            <input
              id="estPomodoros"
              type="number"
              value={estPomodoros}
              onChange={(e) => setEstPomodoros(Number(e.target.value))}
              className="w-16 text-center"
              min={1}
            />
          </div>
          {showNote && (
            <textarea
              placeholder="Add a note for your task"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              className="w-full text-gray-700 mt-2 p-2 bg-gray-100 rounded"
              rows={3}
            />
          )}
          <div className="flex mt-2">
            <button
              type="button"
              onClick={() => setShowNote(!showNote)}
              className="flex-1 text-sm text-blue-500 hover:text-blue-700"
            >
              + Add Note
            </button>
            <button type="button" className="text-gray-500 mr-2">
              Cancel
            </button>
            <button
              type="button"
              onClick={addTask}
              className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
