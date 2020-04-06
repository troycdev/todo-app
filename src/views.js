import { getFilters } from './filters.js'
import { toggleTodo, removeTodo, getTodos } from './todos.js'

const renderTodos = () => {
    const todos = getTodos()
    const { searchText, hideCompleted } = getFilters()
    const filteredTodos = todos.filter((todo) => todo.text.toLowerCase().includes(searchText.toLowerCase()) && (!hideCompleted || !todo.completed))
    const incompleteTodos = filteredTodos.filter((todo) => !todo.completed)
    const todoEl = document.querySelector('#todos')

    todoEl.innerHTML = ''
    todoEl.appendChild(generateSummaryDOM(incompleteTodos))

    if (filteredTodos.length > 0) {
        filteredTodos.forEach((todo) => {
            todoEl.appendChild(generateTodoDOM(todo))
        })
    } else {
        const messageEl = document.createElement('p')
        messageEl.textContent = 'No todos to show'
        messageEl.classList.add('empty-message')
        todoEl.appendChild(messageEl)
    }
}

const generateTodoDOM = (todo) => {
    const todoEl = document.createElement('label')
    const containerEl = document.createElement('div')
    const checkbox = document.createElement('input')
    const todoText = document.createElement('span')
    const removeButton = document.createElement('button')

    checkbox.setAttribute('type', 'checkbox')
    checkbox.checked = todo.completed
    containerEl.appendChild(checkbox)
    checkbox.addEventListener('change', () => {
        toggleTodo(todo.id)
        renderTodos()
    })

    todoText.textContent = todo.text
    containerEl.appendChild(todoText)

    todoEl.classList.add('list-item')
    containerEl.classList.add('list-item__container')
    todoEl.appendChild(containerEl)

    removeButton.textContent = "remove"
    removeButton.classList.add('button', 'button--text')
    todoEl.appendChild(removeButton)
    removeButton.addEventListener('click', () => {
        removeTodo(todo.id)
        renderTodos()
    })

    return todoEl
}

const generateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement('h2')
    summary.classList.add('list-title')
    if (incompleteTodos.length != 1) {
        summary.textContent = `You have ${incompleteTodos.length} todos left`
    } else {
        summary.textContent = `You have ${incompleteTodos.length} todo left`
    }
    return summary
}

export { renderTodos }