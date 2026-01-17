const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('themeTasks')) || [];

function renderTasks() {
    taskList.innerHTML = "";
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        // Use a span for the text to make it easy to style the strike-through
        li.innerHTML = `
            <div class="task-info" onclick="toggleTask(${index})">
                <span>${task.text}</span>
                <small>${task.date || ''}</small>
            </div>
            <button class="delete-btn" onclick="deleteTask(${index})">🗑️</button>
        `;
        taskList.appendChild(li);
    });

    localStorage.setItem('themeTasks', JSON.stringify(tasks));
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    const now = new Date();
    const dateString = now.toLocaleDateString() + ' ' + now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    tasks.push({ text: text, completed: false, date: dateString });
    taskInput.value = "";
    renderTasks();
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function addTask() {
    const text = taskInput.value.trim();
    if (text === "") return;

    // Create a new date object for the current time
    const now = new Date();
    
    // Format the date for a clean look: "Jan 17, 11:34 PM"
    const dateString = now.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
    }) + ', ' + now.toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
    });

    tasks.push({ 
        text: text, 
        completed: false, 
        date: dateString 
    });
    
    taskInput.value = "";
    renderTasks();
}

renderTasks();