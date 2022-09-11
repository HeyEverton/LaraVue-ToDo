<template>
  <div class="container d-flex justify-content-center mt-10">
    <NavBar />

    <form>
      <div class="mb-3 mt-4">
        <h1 class="mb-4">Lista de tarefas</h1>

        <label for="label" class="form-label fs-5">Nome</label>
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Insira o nome da tarefa"
            aria-label="Insira o nome da tarefa" aria-describedby="button-addon2">
          <button class="btn btn-outline-primary" type="button" id="buttonSend">Adicionar</button>
        </div>
        <div v-if="spinner.get_todos" class="d-flex justify-content-center">
          <img src="@/assets/img/spinner.svg" class=" mr-2" alt="loading">
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
          this.todos = response.data.data
        })
        .finally(() => {
          this.spinner.get_todos = false

        })
    }
  },

  created() {
    this.getTodos()
  },
}
</script>
