class TodoApp {
    constructor() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || [];
        this.editingId = null;
        this.init();
    }

    init() {
        this.bindEvents();
        this.render();
        this.updateStats();
    }

    bindEvents() {
        // 追加ボタンのイベント
        document.getElementById('addBtn').addEventListener('click', () => {
            this.addTodo();
        });

        // Enterキーでの追加
        document.getElementById('taskInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTodo();
            }
        });


    }

    addTodo() {
        const input = document.getElementById('taskInput');
        const text = input.value.trim();
        
        if (text === '') {
            alert('タスクを入力してください。');
            return;
        }

        const todo = {
            id: Date.now(),
            text: text,
            completed: false,
            createdAt: new Date().toISOString()
        };

        this.todos.push(todo);
        this.saveTodos();
        this.render();
        this.updateStats();
        
        input.value = '';
        input.focus();
    }





    startEditing(todoId) {
        this.editingId = todoId;
        this.render();
        
        // 編集入力フィールドにフォーカス
        const editInput = document.querySelector('.edit-input');
        if (editInput) {
            editInput.focus();
            editInput.select();
        }
    }

    saveEdit(todoId) {
        const editInput = document.querySelector('.edit-input');
        const newText = editInput.value.trim();
        
        if (newText === '') {
            alert('タスクを入力してください。');
            return;
        }

        const todo = this.todos.find(t => t.id === todoId);
        if (todo) {
            todo.text = newText;
            this.saveTodos();
            this.editingId = null;
            this.render();
            this.updateStats();
        }
    }

    cancelEdit() {
        this.editingId = null;
        this.render();
    }

    getSelectedTodos() {
        const checkboxes = document.querySelectorAll('.todo-checkbox:checked');
        return Array.from(checkboxes).map(cb => parseInt(cb.dataset.todoId));
    }

    toggleTodo(todoId) {
        const todo = this.todos.find(t => t.id === todoId);
        if (todo) {
            todo.completed = !todo.completed;
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    deleteTodo(todoId) {
        if (confirm('このタスクを削除しますか？')) {
            this.todos = this.todos.filter(t => t.id !== todoId);
            this.saveTodos();
            this.render();
            this.updateStats();
        }
    }

    saveTodos() {
        localStorage.setItem('todos', JSON.stringify(this.todos));
    }

    render() {
        const todoList = document.getElementById('todoList');
        
        if (this.todos.length === 0) {
            todoList.innerHTML = '<div class="empty-state">タスクがありません。新しいタスクを追加してください。</div>';
            return;
        }

        todoList.innerHTML = this.todos.map(todo => {
            const isEditing = this.editingId === todo.id;
            
            if (isEditing) {
                return `
                    <div class="todo-item">
                        <input type="checkbox" class="todo-checkbox" data-todo-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                        <input type="text" class="edit-input" value="${todo.text}" maxlength="100">
                        <div class="todo-actions">
                            <button class="btn btn-success btn-small" onclick="todoApp.saveEdit(${todo.id})">保存</button>
                            <button class="btn btn-warning btn-small" onclick="todoApp.cancelEdit()">キャンセル</button>
                        </div>
                    </div>
                `;
            } else {
                return `
                    <div class="todo-item ${todo.completed ? 'completed' : ''}">
                        <input type="checkbox" class="todo-checkbox" data-todo-id="${todo.id}" ${todo.completed ? 'checked' : ''}>
                        <span class="todo-text" onclick="todoApp.startEditing(${todo.id})">${todo.text}</span>
                        <div class="todo-actions">
                            <button class="btn btn-danger btn-small" onclick="todoApp.deleteTodo(${todo.id})">削除</button>
                        </div>
                    </div>
                `;
            }
        }).join('');

        // チェックボックスのイベントを再バインド
        document.querySelectorAll('.todo-checkbox').forEach(checkbox => {
            checkbox.addEventListener('change', (e) => {
                const todoId = parseInt(e.target.dataset.todoId);
                this.toggleTodo(todoId);
            });
        });

        // 編集入力フィールドのイベントをバインド
        const editInput = document.querySelector('.edit-input');
        if (editInput) {
            editInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') {
                    this.saveEdit(this.editingId);
                }
            });
            
            editInput.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    this.cancelEdit();
                }
            });
        }
    }

    updateStats() {
        const totalTasks = this.todos.length;
        const completedTasks = this.todos.filter(todo => todo.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        document.getElementById('totalTasks').textContent = totalTasks;
        document.getElementById('completedTasks').textContent = completedTasks;
        document.getElementById('pendingTasks').textContent = pendingTasks;
    }
}

// アプリケーションの初期化
const todoApp = new TodoApp(); 