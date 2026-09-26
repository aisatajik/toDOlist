//mock data
const tasks = [
  { id: 1, name: "Buybuy clothes", category: "Shopping", completed: false },
  { id: 2, name: "Finish project", category: "Work", completed: true },
  { id: 3, name: "Clean my room", category: "Home", completed: true },
  { id: 4, name: "call friends", category: "Personal", completed: false },
  { id: 5, name: "Learning Javascript", category: "Personal", completed: false },
];

const table = document.getElementById("table-body");
const selectCategory = document.getElementById("select-category");
const filterCategory = document.getElementById("filter-category");
const taskInput = document.getElementById("task-input");
const add = document.getElementById("add");
const searchInput = document.getElementById("search-input");
const filter = document.getElementById("filter");
const search = document.getElementById("search");

const displayTask = (taskArray) => {
  table.innerHTML = "";
  taskArray.forEach((task) => {
    const tr = document.createElement("tr");

    const id = document.createElement("td");
    const name = id.cloneNode(); /* = document.createElement("td");*/
    const category = id.cloneNode();
    const completed = id.cloneNode();

    id.textContent = task.id;
    name.textContent = task.name;
    category.textContent = task.category;
    // completed.textContent = task.completed;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    checkbox.addEventListener("click", () => {
      task.completed = !task.completed;
      displayTask(tasks);
    });

    completed.appendChild(checkbox);
    if (task.completed) {
      name.style.textDecoration = "line-through";
    }

    tr.append(id, name, category, completed);

    table.appendChild(tr);
  });
};

const initialCategories = () => {
  const categoryObj = { all: null };
  //{personal:null,}
  tasks.forEach((item) => {
    Object.assign(categoryObj, { [item.category]: null });
  });
  for (const key in categoryObj) {
    const option = document.createElement("option");
    option.textContent = key;
    if (key !== "all") {
      selectCategory.appendChild(option);
    }
    filterCategory.appendChild(option.cloneNode(true));
  }
};

const initialize = () => {
  initialCategories();
  displayTask(tasks);
};

const addNewTask = () => {
  const taskName = taskInput.value;
  if (!taskName) return alert("you must input a task");
  const newTask = {
    id: tasks.length + 1,
    name: taskInput.value,
    category: selectCategory.value,
    completed: false,
  };
  tasks.push(newTask);
  displayTask(tasks);
  taskInput.value = "";
};

add.addEventListener("click", addNewTask);

const filterTask = () => {
  const selectedCategory = filterCategory.value;
  const filterTasks = tasks.filter((task) => {
    if (selectedCategory === "all") return task;
    return task.category === selectedCategory;
  });
  displayTask(filterTasks);
};
filter.addEventListener("click", filterTask);

const searchTask = () => {
  const filtered = tasks.filter((task) => {
    return task.name.toLowerCase().includes(searchInput.value.trim().toLowerCase());
  });

  displayTask(filtered);
};

search.addEventListener("click", searchTask);

window.onload = initialize;

const color1 = document.getElementById("color1");
const color2 = document.getElementById("color2");
const body = document.querySelector("body");

const handleBackground = () => {
  body.style.background = `linear-gradient(to right, ${color1.value}, ${color2.value})`;
};

color1.addEventListener("input", handleBackground);
color2.addEventListener("input", handleBackground);
