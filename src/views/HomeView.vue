<template>
  <div class="container d-flex justify-content-center mt-10">
    <NavBar />

    <form @submit.stop.prevent="createTodo">
      <div class="mb-3 mt-4">
        <h1 class="mb-4">Lista de tarefas</h1>
        <div :class="`alert alert-${response.color}`" v-if="response.message">
          <h6>{{response.message}}</h6>
        </div>
        <div class="input-group mb-3">
          <input v-model="newTodo" type="text" class="form-control" placeholder="Insira o nome da lista..."
            aria-label="Insira o nome da tarefa" aria-describedby="button-addon2">
          <button class="btn btn-outline-primary" @click="createTodo" type="button" id="buttonSend">Adicionar</button>
        </div>

        <div v-if="spinner.get_todos" class="d-flex justify-content-center">
          <img src="@/assets/img/spinner.svg" class=" thumbnail mr-2" alt="loading">
        </div>

        <div v-for="todo in todos" :key="todo.id" class="card mb-2" style="width: 20rem;">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">{{todo.label}}</li>
          </ul>
        </div>

      </div>
    </form>

  </div>
</template>

<script>
// @ is an alias to /src

import NavBar from '@/components/Partials/TheHeader'

export default {
  name: 'HomeView',
  components: {
    NavBar
  },
  data() {
    return {
      newTodo: '',
      todos: [],
      response: {
        color: '',
        message: '',
      },
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
          this.todos = response.data.data
        })
        .finally(() => {
          this.spinner.get_todos = false

        })
    },

    createTodo() {
      if (this.newTodo.length == 0) {
        this.response.message = 'O campo título é obrigatório'
        this.response.color = 'danger'
        return
      }

      
      const payload = {
        label: this.newTodo,
      }
      
      this.spinner.get_todos = true
      this.resetResponse();

      this.$http.post('v1/todos', payload)
        .then((response) => {
          this.todos.unshift(response.data.data)
          this.newTodo = ''
          this.spinner.get_todos = false
          this.response.message = 'Lista criada com sucesso'
          this.response.color = 'success'
        })
        
      },

    resetResponse() {
      this.response.color = ''
      this.response.message = ''
    },

  },

  created() {
    this.getTodos()
  },
}
</script>
