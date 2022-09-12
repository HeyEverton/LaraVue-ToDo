<template>
    <div class="container d-flex justify-content-center mt-10">
        <NavBar />
        <!-- <ValidationObserver tag="form" ref="loginForm" @submit.stop.prevent="loginUser"> -->
        <form>
            <div class="mb-3">
                <div v-if="spinner.get_todo" class="d-flex justify-content-center">
                    <img v-if="spinner.get_todo" src="@/assets/img/spinner.svg" class="thumbnail mr-2"
                        alt="loading.." />
                </div>

                <template v-else>

                    <div class="mb-3 mt-4">
                        <h4 class="mb-4">
                            {{ todo.label}}
                        </h4>
                    </div>

                    <TodoTaskCard v-for="task in todo.tasks" :key="task.id" :Task="Task"/>

                    <div class="input-group mb-3">
                        <input v-model="newTask" type="text" class="form-control" placeholder="Adicione um novo item..."
                            aria-label="Insira o nome da tarefa" aria-describedby="button-addon2">
                        <button class="btn btn-outline-primary" @click="addTask" type="button"
                            id="buttonSend">Adicionar</button>
                    </div>

                    <div class="card mb-2" style="width: 20rem;" v-for="task in todo.tasks" :key="task.id">
                        <ul class="list-group list-group-flush" v-if="todo.tasks.length">
                            <li class="list-group-item d-flex justify-content-between align-items-center">
                                {{task.label}} <br>
                            </li>
                        </ul>
                        <div v-else class="text-center text-lg text-gray-600">
                            Você ainda não tem nenhuma tarefa.
                        </div>
                    </div>



                </template>
                <!-- <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div> -->
                <!-- </ValidationProvider> -->
            </div>
        </form>
        <!-- </ValidationObserver> -->

    </div>
</template>
<script>
import NavBar from '@/components/Partials/TheHeader'
import TodoTaskCard from '@/components/Todos/TodoTaskCard.vue'

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
