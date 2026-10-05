const button = document.getElementById('toggle-sidebar');
const sidebar = document.querySelector('.sidebar');

button.addEventListener('click', function() {
    sidebar.classList.toggle('hidden');
});

const settingsLink = document.getElementById('settings-link');
const homeLink = document.getElementById('home-link');
const tasksSection = document.querySelector(".tasks");
const settingsSection = document.querySelector(".settings");
const themeSelector = document.getElementById("theme-selector");
const languageSelector = document.getElementById("language-selector");

//Esto es para taducir la interfaz

const translations = {
    es: {
        home: "Inicio",
        tasks: "Tareas",
        garden: "Jardín",
        progress: "Progreso",
        settings: "Ajustes",
        tasksTitle: "Mis Tareas",
        taskPlaceholder: "Escribe una tarea...",
        add: "Agregar",
        settingsTitle: "Ajustes",
        appearanceTitle: "Apariencia",
        themeText: "Modo de color",
        taskBackgroundTitle: "Fondo de tareas",
        taskBackgroundText: "Selecciona un color de fondo para tus tareas",
        languageTitle: "Idioma",
        light: "Claro",
        dark: "Oscuro",
        spanish: "Español",
        english: "English"
    },

    en: {
        home: "Home",
        tasks: "Tasks",
        garden: "Garden",
        progress: "Progress",
        settings: "Settings",
        tasksTitle: "My Tasks",
        taskPlaceholder: "Write a task...",
        add: "Add",
        settingsTitle: "Settings",
        appearanceTitle: "Appearance",
        themeText: "Color mode",
        taskBackgroundTitle: "Task background",
        taskBackgroundText: "Choose a background color for your tasks",
        languageTitle: "Language",
        light: "Light",
        dark: "Dark",
        spanish: "Spanish",
        english: "English"
    }
};

languageSelector.addEventListener("change", function() {

    const language = languageSelector.value;
    const text = translations[language];

    document.getElementById("home-link").textContent = text.home;
    document.getElementById("settings-link").textContent = text.settings;

    const navLinks = document.querySelectorAll("nav a");

    navLinks[1].textContent = text.tasks;
    navLinks[2].textContent = text.garden;
    navLinks[3].textContent = text.progress;

    document.getElementById("tasks-title").textContent = text.tasksTitle;
    document.getElementById("task-input").placeholder = text.taskPlaceholder;
    document.getElementById("add-task").textContent = text.add;

    document.getElementById("settings-title").textContent = text.settingsTitle;
    document.getElementById("appearance-title").textContent = text.appearanceTitle;
    document.getElementById("theme-text").textContent = text.themeText;
    document.getElementById("task-background-title").textContent = text.taskBackgroundTitle;
    document.getElementById("task-background-text").textContent = text.taskBackgroundText;
    document.getElementById("language-title").textContent = text.languageTitle;

    document.getElementById("light-option").textContent = text.light;
    document.getElementById("dark-option").textContent = text.dark;
    document.getElementById("spanish-option").textContent = text.spanish;
    document.getElementById("english-option").textContent = text.english;

});

//Esto es lo de claro y ocuro
themeSelector.addEventListener("change", function(event) {

    const x = event.clientX;
    const y = event.clientY;

    const circle = document.createElement("div");
    circle.classList.add("theme-transition");

    circle.style.left = x + "px";
    circle.style.top = y + "px";

    if (themeSelector.value === "dark") {
        circle.style.background = "#1e1e1e";
        document.body.appendChild(circle);

        setTimeout(function() {
            document.body.classList.add("dark-mode");
            circle.remove();
        }, 700);

    } else {
        circle.style.background = "#f6f8f2";
        document.body.appendChild(circle);

        setTimeout(function() {
            document.body.classList.remove("dark-mode");
            circle.remove();
        }, 700);
    }

    

});

const colorOptions = document.querySelectorAll(".color-option");

colorOptions.forEach(function(option) {

    option.addEventListener("click", function() {

        const color = option.dataset.color;

        document.querySelector(".main-content").style.background = color;

    });

});

//Esto comtrola ajustes
settingsLink.addEventListener("click", function(event) {
    event.preventDefault();

    tasksSection.style.display = "none";
    settingsSection.style.display = "block";
});

homeLink.addEventListener("click", function(event) {
    event.preventDefault();

    tasksSection.style.display = "flex";
    settingsSection.style.display = "none";
});

const taskInput = document.getElementById('task-input');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');

let tasks = [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        tasks = JSON.parse(savedTasks);
    }
}

function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const newTask = {
        text: taskText,
        completed: false
    };

    tasks.push(newTask);
    saveTasks();

    const task = document.createElement("div");
    task.classList.add("task-item");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    const text = document.createElement("span");
    text.textContent = taskText;

    task.appendChild(checkbox);
    task.appendChild(text);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "x";
    task.appendChild(deleteButton);

    deleteButton.addEventListener("click", function() {
        task.remove();
    });

    checkbox.addEventListener("change", function() {
        task.classList.toggle("completed")
    });

    taskList.prepend(task);
    taskInput.value = "";
}

addTaskButton.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});

function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach(function(taskData) {
        
        const task = document.createElement("div");
        task.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = taskData.completed;
        if (taskData.completed) {
            task.classList.add("completed");
        }

        const text = document.createElement("span");
        text.textContent = taskData.text;

        task.appendChild(checkbox);
        task.appendChild(text);

        checkbox.addEventListener("change", function() {
            taskData.completed = checkbox.checked;
            task.classList.toggle("completed", checkbox.checked);
            saveTasks();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "x";
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item !== taskData;
            });

            saveTasks();
            task.remove();
        });

        task.appendChild(deleteButton);

        taskList.prepend(task);
    });
}

loadTasks();
renderTasks();
