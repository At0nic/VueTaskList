new Vue({
    el: '#app',
    data: {
      newTask: '', // pro přidání nového úkolu
      tasks: [], // seznam úkolů
      filter: 'all', // filtr pro zobrazení úkolů
    },
    computed: {
      // Počítaná vlastnost pro počet nedokončených úkolů
      incompleteTasks() {
        return this.tasks.filter(task => !task.completed).length;
      },
      // Filtr pro zobrazení úkolů podle stavu
      filteredTasks() {
        if (this.filter === 'active') {
          return this.tasks.filter(task => !task.completed);
        } else if (this.filter === 'completed') {
          return this.tasks.filter(task => task.completed);
        }
        return this.tasks;
      }
    },
    methods: {
      // Přidání nového úkolu
      addTask() {
        if (this.newTask.trim() === '') return;
        const newTask = {
          id: Date.now(), // unikatní ID pro každý úkol
          text: this.newTask,
          completed: false
        };
        this.tasks.push(newTask);
        this.newTask = ''; // vyčistit vstupní pole
      },
      // Odstranění úkolu
      removeTask(id) {
        this.tasks = this.tasks.filter(task => task.id !== id);
      },
      // Přepnutí stavu dokončení úkolu
      toggleTaskCompletion(id) {
        const task = this.tasks.find(task => task.id === id);
        if (task) {
          task.completed = !task.completed;
        }
      }
    },
    mounted() {
      // Načítání úkolů z localStorage při inicializaci aplikace
      const savedTasks = JSON.parse(localStorage.getItem('tasks'));
      if (savedTasks) {
        this.tasks = savedTasks;
      }
    },
    watch: {
      tasks: {
        handler(tasks) {
          // Ukládání úkolů do localStorage při každé změně
          localStorage.setItem('tasks', JSON.stringify(tasks));
        },
        deep: true
      }
    }
  });
  