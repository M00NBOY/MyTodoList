app = new Vue({
    el: '#app',
    data: {
      title: 'ToDo',
      tasks: [],
      newItem: '',
      checked: '',
      allChecked: [],
      btn_all:'tout cocher',
      wichList: 1,
      taskTitle: 'Toutes les tasks'
    },
    methods:{
      addItem: function(){
        let id = this.tasks.length + 1
        if (this.newItem !== '') {
          const newTask = {id: id, item:this.newItem, checked:false}
          this.tasks.push(newTask)
          this.newItem = ''
        }
      },
      deleteItem: function(index){
        if (this.tasks[index].checked) {
          this.tasks.splice(index,1)
          this.allChecked.splice(index,1)
        } else {
          alert('finis ta t\u00E2che avant de la supprimer !!! \nGros fain\u00E9ant >:(')
        }
      },
      checkAll: function(){
        if (this.btn_all === 'tout cocher') {
          for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i].checked = true
            this.btn_all = 'tout d\u00E9cocher'
          }
        } else {
          for (let i = 0; i < this.tasks.length; i++) {
            this.tasks[i].checked = false
            this.btn_all = 'tout cocher'
          }
        }
      },
      deleteAll: function(){
        for (var i=this.tasks.length-1 ; i>=0; i--) {
          if (this.tasks[i].checked) {
            this.tasks.splice(i, 1)
            this.btn_all = 'tout cocher'
          }
        }
      },
      displayAll: function(){
        this.wichList = 1
        this.taskTitle = 'Toutes les tasks'
      },
      displayDo: function(){
        this.wichList = 2
        this.taskTitle = 'Task complétées'
      },
      displayTodo: function(){
        this.wichList = 3
        this.taskTitle = 'Task à compléter'
      }
    },
    mounted() {
      if (localStorage.getItem('tasks')) this.tasks = JSON.parse(localStorage.getItem('tasks'));
    },
    watch: {
        tasks: {
          handler: function () {
            localStorage.setItem('tasks', JSON.stringify(this.tasks));
            this.allChecked = this.tasks.filter(function(task){
              return task.checked
            })
            if (this.allChecked.length === 0 ) {
              this.btn_all = 'tout cocher'
            }
            if (this.allChecked.length === this.tasks.length) {
              this.btn_all = 'tout d\u00E9cocher'
            }
            if (this.tasks.length === 0 ) {
              this.btn_all = 'tout cocher'
            }
          },
          deep: true
        }
      }
  })