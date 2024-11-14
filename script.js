const table = document.querySelector(".table")
const tile = document.querySelector(".tile")
const tableView = document.querySelector(".table-view")
const tileView = document.querySelector(".grid-view")
const addBtn = document.querySelector(".add-btn")
const editBtn = document.querySelector(".edit-btn")
const modal = document.querySelector(".modal")
const closeModal = document.querySelector(".close-modal")

tile.onclick = () => {
    tile.classList.add("active")
    table.classList.remove("active")
    tableView.classList.remove("show")
    tileView.classList.add("show")
}

table.onclick = () => {
    table.classList.add("active")
    tile.classList.remove("active")
    tableView.classList.add("show")
    tileView.classList.remove("show")
}
  
addBtn.onclick = () => {
    modal.classList.add("show")
}

closeModal.onclick = () => {
    modal.classList.remove("show")
    addTask()
}

function addTask() {
    const title = document.querySelector(".task-title").value
    const description = document.querySelector(".task-desc").value
    const time = document.querySelector(".task-time").value
    const date = document.querySelector(".task-date").value
    const type = document.querySelector(".task-type").value

    const tbody = document.querySelector(".table-body")
    const row = document.createElement("tr")

    row.innerHTML = `
        <td>${title}</td>
        <td>${description}</td>
        <td>${date}</td>
        <td>${time}</td>
        <td class="status ${type === "done" ? "completed" : "not-completed"}">${type === "done" ? "Выполнено" : "Не выполнено"}</td>
    `

    tbody.appendChild(row)

    document.querySelector(".task-title").value = ""
    document.querySelector(".task-desc").value = ""
    document.querySelector(".task-time").value = ""
    document.querySelector(".task-date").value = ""
    document.querySelector(".task-type").value = ""
}

loadTasks()

function loadTasks() {
    axios.get('http://localhost:3001/tasks')
        .then(response => {
            const tasks = response.data
            Table(tasks)
            Grid(tasks)
        })
}

function Table(tasks) {
    const tableBody = document.querySelector(".table-body")
    tableBody.innerHTML = ''

    tasks.forEach(task => {
        const row = document.createElement("tr")
        row.innerHTML = `
            <td>${task.title}</td>
            <td>${task.description}</td>
            <td>${task.date}</td>
            <td>${task.time}</td>
            <td class="status ${task.status === "completed" ? "completed" : task.status === "in-progress" ? "in-progress" : "not-completed"}">
                ${task.status === "completed" ? "Готово" : task.status === "in-progress" ? "В прогрессе" : "Не выполнено"}
            </td>
        `
        tableBody.appendChild(row)
    })
}

function Grid(tasks) {
    const gridView = document.querySelector(".grid-view")
    gridView.innerHTML = ''

    tasks.forEach(task => {
        const card = document.createElement("div")
        card.className = "card"
        card.innerHTML = `
            <h3>${task.title}</h3>
            <p class="desk">${task.description}</p>
            <div class="data">
                <p>${task.date}</p>
                <p>${task.time}</p>
            </div>
            <p class="status ${task.status === "completed" ? "completed" : task.status === "in-progress" ? "in-progress" : "not-completed"}">
                ${task.status === "completed" ? "Готово" : task.status === "in-progress" ? "В прогрессе" : "Не выполнено"}
            </p>
        `
        gridView.appendChild(card)
    })
}
