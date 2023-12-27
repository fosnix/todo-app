import { v4 as uuidV4 } from "uuid";

type Task = { id: string; title: string; completed: boolean; createdAt: Date };

const task_list = document.querySelector<HTMLUListElement>("#task-list");
const new_task_form = document.querySelector<HTMLFormElement>("#new-task-form");
const new_task_title = document.querySelector<HTMLInputElement>("#new-task-title");

const tasks: Task[] = loadTask();
tasks.forEach(addListItem);

new_task_form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (new_task_title?.value == "" || new_task_title?.value == null) return;

  const new_task: Task = {
    id: uuidV4(),
    title: new_task_title.value,
    completed: false,
    createdAt: new Date(),
  };

  tasks.push(new_task);

  addListItem(new_task);
  new_task_title.value = "";
});

function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTask();
  })

  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  label.append(checkbox, task.title);
  item.append(label);
  task_list?.append(item);
}

function saveTask() {
  localStorage.setItem("Tasks", JSON.stringify(tasks));
}

function loadTask(): Task[] {
  const taskJSON = localStorage.getItem("Tasks");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
