const deleteBtn = document.querySelectorAll('.del');
const editBtn = document.querySelectorAll('.edit');
const todoItem = document.querySelectorAll('span.not');
const todoComplete = document.querySelectorAll('span.completed');

Array.from(deleteBtn).forEach((el) => {
    el.addEventListener('click', deleteTodo);
});

Array.from(editBtn).forEach((el) => {
    el.addEventListener('click', editTodo);
});

Array.from(todoItem).forEach((el) => {
    el.addEventListener('click', markComplete);
});

Array.from(todoComplete).forEach((el) => {
    el.addEventListener('click', markIncomplete);
});

async function deleteTodo() {
    const todoId = this.parentNode.dataset.id;
    try {
        const response = await fetch('todos/deleteTodo', {
            method: 'DELETE',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

function editTodo() {
    const todoItem = this.parentNode;
    const todoId = todoItem.dataset.id;
    const todoTextElement = todoItem.querySelector('.not');
    const editInput = document.createElement('input');
    editInput.value = todoTextElement.textContent;
    editInput.classList.add('editInput');

    editInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            updateTodo(todoId, editInput.value);
        }
    });

    editInput.addEventListener('blur', () => {
        updateTodo(todoId, editInput.value);
    });

    todoTextElement.replaceWith(editInput);
    editInput.focus();
}

async function updateTodo(todoId, updatedTodoText) {
    try {
        const response = await fetch('todos/editTodo', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId,
                'updatedTodoText': updatedTodoText,
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function markComplete() {
    const todoId = this.parentNode.dataset.id;
    try {
        const response = await fetch('todos/markComplete', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}

async function markIncomplete() {
    const todoId = this.parentNode.dataset.id;
    try {
        const response = await fetch('todos/markIncomplete', {
            method: 'PUT',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                'todoIdFromJSFile': todoId
            })
        });
        const data = await response.json();
        console.log(data);
        location.reload();
    } catch (err) {
        console.log(err);
    }
}
