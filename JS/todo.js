const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

const sampleTasks = [
    { text: "Buy groceries", completed: false, date: "Jan 1, 10:00 AM" },
    { text: "Walk the dog", completed: true, date: "Jan 1, 10:30 AM" },
    { text: "Read a book", completed: false, date: "Jan 1, 11:00 AM" },
    { text: "Clean the house", completed: false, date: "Jan 1, 12:00 PM" },
    { text: "Pay bills", completed: true, date: "Jan 2, 09:00 AM" },
    { text: "Call mom", completed: false, date: "Jan 2, 05:00 PM" },
    { text: "Water plants", completed: false, date: "Jan 3, 08:00 AM" },
    { text: "Exercise", completed: true, date: "Jan 3, 06:00 PM" },
    { text: "Meditate", completed: false, date: "Jan 4, 07:00 AM" },
    { text: "Write code", completed: false, date: "Jan 4, 10:00 AM" },
    { text: "Review PRs", completed: true, date: "Jan 4, 02:00 PM" },
    { text: "Update documentation", completed: false, date: "Jan 5, 11:00 AM" },
    { text: "Plan vacation", completed: false, date: "Jan 6, 08:00 PM" },
    { text: "Book flight", completed: false, date: "Jan 7, 09:00 AM" },
    { text: "Pack bags", completed: false, date: "Jan 8, 06:00 PM" },
    { text: "Go to airport", completed: false, date: "Jan 9, 05:00 AM" },
    { text: "Check in hotel", completed: false, date: "Jan 9, 02:00 PM" },
    { text: "Visit museum", completed: true, date: "Jan 10, 10:00 AM" },
    { text: "Try local food", completed: true, date: "Jan 10, 01:00 PM" },
    { text: "Take photos", completed: false, date: "Jan 10, 03:00 PM" },
    { text: "Buy souvenirs", completed: false, date: "Jan 11, 11:00 AM" },
    { text: "Write blog post", completed: false, date: "Jan 12, 09:00 AM" },
    { text: "Edit video", completed: false, date: "Jan 12, 02:00 PM" },
    { text: "Upload to YouTube", completed: false, date: "Jan 13, 10:00 AM" },
    { text: "Share on social media", completed: false, date: "Jan 13, 10:30 AM" },
    { text: "Reply to comments", completed: false, date: "Jan 13, 11:00 AM" },
    { text: "Check analytics", completed: false, date: "Jan 14, 09:00 AM" },
    { text: "Optimize SEO", completed: false, date: "Jan 15, 10:00 AM" },
    { text: "Update portfolio", completed: false, date: "Jan 16, 02:00 PM" },
    { text: "Sleep", completed: false, date: "Jan 16, 11:00 PM" }
];

let tasks = JSON.parse(localStorage.getItem('themeTasks'));

if (!tasks || tasks.length === 0) {
    tasks = sampleTasks;
    localStorage.setItem('themeTasks', JSON.stringify(tasks));
}

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