import 'core-js/stable';
import 'regenerator-runtime/runtime';

import {createTodo, loadTodos} from './todos.js'
import {renderTodos} from './views.js'
import {setFilters} from './filters.js'

renderTodos()

document.querySelector('#search-text').addEventListener('input', (e) => {
    setFilters({
        searchText: e.target.value
    })
    renderTodos()
})

document.querySelector('#hide-completed').addEventListener('change', (e) => {
    setFilters({
        hideCompleted: e.target.checked
    })
    renderTodos()
})

document.querySelector('#new-todo').addEventListener('submit', (e) => {
    e.preventDefault()
    const text = e.target.elements.newTodo.value.trim()
    if (text.length > 0) {
        createTodo(text)
        renderTodos()
        e.target.elements.newTodo.value = ''
    }
})

window.addEventListener('storage', (e) => {
    if (e.key === 'todos') {
        loadTodos()
        renderTodos()
    }
})