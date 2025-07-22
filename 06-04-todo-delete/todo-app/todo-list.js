// ToDoアプリのメイン機能
class TodoApp {
    constructor() {
        this.tasks = [];
        this.taskInput = document.getElementById('taskInput');
        this.addButton = document.getElementById('addButton');
        this.taskList = document.getElementById('taskList');
        this.deleteButton = document.getElementById('deleteButton');
        
        this.init();
    }
    
    init() {
        // ローカルストレージからタスクを読み込み
        this.loadTasks();
        
        // イベントリスナーを設定
        this.addButton.addEventListener('click', () => this.addTask());
        this.taskInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.addTask();
            }
        });
        this.deleteButton.addEventListener('click', () => this.deleteSelectedTasks());
        
        // 初期表示
        this.renderTasks();
    }
    
    addTask() {
        const taskText = this.taskInput.value.trim();
        
        if (taskText === '') {
            this.showMessage('タスクを入力してください。', 'warning');
            return;
        }
        
        // 新しいタスクを作成
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        // タスクを配列に追加
        this.tasks.push(task);
        
        // ローカルストレージに保存
        this.saveTasks();
        
        // 表示を更新
        this.renderTasks();
        
        // 入力フィールドをクリア
        this.taskInput.value = '';
        
        // 成功メッセージを表示
        this.showMessage('タスクが追加されました！', 'success');
    }
    
    toggleTask(taskId) {
        // タスクの完了状態を切り替え
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
        }
    }

    deleteSelectedTasks() {
        const selectedTasks = this.tasks.filter(task => task.selected);
        
        if (selectedTasks.length === 0) {
            this.showMessage('削除するタスクを選択してください。', 'warning');
            return;
        }
        
        // 選択されたタスクを削除
        this.tasks = this.tasks.filter(task => !task.selected);
        
        // ローカルストレージに保存
        this.saveTasks();
        
        // 表示を更新
        this.renderTasks();
        
        // 成功メッセージを表示
        this.showMessage(`${selectedTasks.length}個のタスクを削除しました！`, 'success');
    }

    toggleTaskSelection(taskId) {
        const task = this.tasks.find(task => task.id === taskId);
        if (task) {
            task.selected = !task.selected;
            this.updateDeleteButtonState();
        }
    }

    updateDeleteButtonState() {
        const hasSelectedTasks = this.tasks.some(task => task.selected);
        this.deleteButton.disabled = !hasSelectedTasks;
    }
    
    renderTasks() {
        if (this.tasks.length === 0) {
            this.taskList.innerHTML = '<li class="empty-state">タスクがありません。新しいタスクを追加してください！</li>';
            this.updateDeleteButtonState();
            return;
        }
        
        this.taskList.innerHTML = '';
        
        this.tasks.forEach(task => {
            const taskElement = this.createTaskElement(task);
            this.taskList.appendChild(taskElement);
        });
        
        this.updateDeleteButtonState();
    }
    
    createTaskElement(task) {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.dataset.taskId = task.id;
        
        // チェックボックスを作成
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';
        checkbox.checked = task.selected || false;
        checkbox.addEventListener('change', () => this.toggleTaskSelection(task.id));
        
        // タスクテキストを作成
        const taskText = document.createElement('span');
        taskText.className = 'task-text';
        taskText.textContent = task.text;
        
        if (task.completed) {
            taskText.style.textDecoration = 'line-through';
            taskText.style.color = '#888';
        }
        
        // タスクをクリックして完了状態を切り替え
        taskText.addEventListener('click', () => this.toggleTask(task.id));
        taskText.style.cursor = 'pointer';
        
        // タスクコンテンツを作成
        const taskContent = document.createElement('div');
        taskContent.className = 'task-content';
        taskContent.appendChild(checkbox);
        taskContent.appendChild(taskText);
        
        li.appendChild(taskContent);
        
        return li;
    }
    
    saveTasks() {
        localStorage.setItem('todoTasks', JSON.stringify(this.tasks));
    }
    
    loadTasks() {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            this.tasks = JSON.parse(savedTasks);
        }
    }
    
    showMessage(message, type = 'info') {
        // 既存のメッセージを削除
        const existingMessage = document.querySelector('.message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // 新しいメッセージを作成
        const messageElement = document.createElement('div');
        messageElement.className = `message message-${type}`;
        messageElement.textContent = message;
        messageElement.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            max-width: 300px;
        `;
        
        // メッセージタイプに応じて背景色を設定
        const colors = {
            success: '#4caf50',
            warning: '#ff9800',
            error: '#f44336',
            info: '#2196f3'
        };
        
        messageElement.style.backgroundColor = colors[type] || colors.info;
        
        document.body.appendChild(messageElement);
        
        // 3秒後にメッセージを削除
        setTimeout(() => {
            if (messageElement.parentNode) {
                messageElement.remove();
            }
        }, 3000);
    }
}

// CSSアニメーションを追加
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// アプリケーションを初期化
document.addEventListener('DOMContentLoaded', () => {
    new TodoApp();
}); 