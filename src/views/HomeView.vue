<template>
  <div class="container d-flex justify-content-center mt-10">
    <NavBar />

    <form @submit.stop.prevent="createTodo">
      <div class="mb-3 mt-4">

        <h1 class="mb-4">Lista de tarefas</h1>

        <div class="input-group mb-3">
          <input @keyup.enter="createTodo" v-model="newTodo" type="text" class="form-control" placeholder="Insira o nome da lista..."
            aria-label="Insira o nome da tarefa" aria-describedby="button-addon2">
          <button class="btn btn-outline-primary" @click="createTodo" type="button" id="buttonSend">Adicionar</button>
        </div>

        <div v-if="spinner.get_todos" class="d-flex justify-content-center">
          <img src="@/assets/img/spinner.svg" class=" thumbnail mr-2" alt="loading">
        </div>

        <TodoCard v-for="todo in todos" :key="todo.id" :todo="todo" @afterDeleting="afterDeleting" />

      </div>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/Partials/TheHeader'
import TodoCard from '@/components/Todos/TodoCard'
export default {
  name: 'HomeView',
  components: {
    NavBar,
    TodoCard
  },
  data() {
    return {
      newTodo: '',
      todos: [],
      spinner: {
        get_todos: false,
      }
    }
  },

  methods: {

    getTodos() {
      this.spinner.get_todos = true

      this.$http.get('v1/todos')
        .then((response) => {
          this.todos = response.data.data.map((o) => ({
            ...o,
            state: 'show',
          }))
        })
        .finally(() => {
          this.spinner.get_todos = false

        })
    },

    createTodo() {
      if (!this.newTodo.length) {
        return
      }
      const payload = {
        label: this.newTodo,
      }

      this.spinner.get_todos = true

      this.$http.post('v1/todos', payload)
        .then((response) => {
          this.todos.unshift({...response.data.data, state: 'show' })
          this.newTodo = ''
          this.spinner.get_todos = false
        })

    },

    afterDeleting(todo) {
      const idx = this.todos.findIndex(o => o.id === todo.id);
      this.todos.splice(idx, 1)
    },

  },

  created() {
    this.getTodos()
  },
}
</script>
