<template>
    <div class="container d-flex justify-content-center mt-10">
        <NavBar />
        <div class="mb-3">
            <div v-if="spinner.get_todo" class="d-flex justify-content-center">
                <img v-if="spinner.get_todo" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="loading.." />
            </div>

            <template v-else>
                <div class="mb-3 mt-4">
                    <h4 class="mb-4">
                        {{ todo.label}}
                    </h4>
                </div>

                <form>
                    <div class="input-group mb-3">
                        <input v-model="newTask" type="text" class="form-control" placeholder="Adicione um novo item..."
                            aria-label="Adicione um novo item..." aria-describedby="button-addon2">
                        <button class="btn btn-outline-primary" @click="addTask" type="button"
                            id="buttonSend">Adicionar</button>
                    </div>
                </form>
                <div class="card mb-2" style="width: 20rem;" >

                    <div v-if="todo.tasks.length">
                        <TodoTaskCard v-for="task in todo.tasks" :key="task.id" :task="task" />
                    </div>

                    <div v-else class="text-center text-lg">
                        Você ainda não tem nenhuma tarefa.
                    </div>
                </div>

            </template>

        </div>


    </div>
</template>
<script>
import NavBar from '@/components/Partials/TheHeader'
import TodoTaskCard from '@/components/Todos/TodoTaskCard'

export default {
    name: 'TodoTasks',

    components: {
        NavBar,
        TodoTaskCard
    },

    data() {
        return {
            newTask: '',
            todo: {},
            spinner: {
                get_todo: true
            }
        }
    },

    methods: {

        getTodo() {
            this.spinner.get_todo = true
            this.$http
                .get(`v1/todos/${this.$route.params.id}`)
                .then((response) => {
                    this.todo = response.data.data
                })
                .finally(() => {
                    this.spinner.get_todo = false
                })
        },

        addTask() {
            if (!this.newTask) { return }

            const payload = {
                label: this.newTask,
            }

            this.$http
                .post(`v1/todos/${this.$route.params.id}/tasks`, payload)
                .then((response) => {
                    this.todo.tasks.unshift(response.data.data)

                    this.newTask = ''

                })
        }
    },

    created() {
        this.getTodo()
    },
}
</script>
