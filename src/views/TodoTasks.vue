<template>
    <div class="container d-flex justify-content-center mt-10">
        <NavBar />
        <div class="mb-3">
            <div v-if="spinner.get_todo" class="d-flex justify-content-center">
                <img v-if="spinner.get_todo" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="loading.." />
            </div>

            <template v-else>
                <div class="mb-3 mt-4 d-flex align-items-center justify-content-between">
                    <RouterLink :to="{ name: 'home' }" class="ml-2 mb-4">
                        <svg class="text-gray mr-2 align-items-center"  style="width: 30px;" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M12.7071 5.29289C13.0976 5.68342 13.0976 6.31658 12.7071 6.70711L9.41421 10L12.7071 13.2929C13.0976 13.6834 13.0976 14.3166 12.7071 14.7071C12.3166 15.0976 11.6834 15.0976 11.2929 14.7071L7.29289 10.7071C6.90237 10.3166 6.90237 9.68342 7.29289 9.29289L11.2929 5.29289C11.6834 4.90237 12.3166 4.90237 12.7071 5.29289Z"
                                fill="currentColor" />
                        </svg>
                    </RouterLink>
                    <h4 class="mb-4 d-flex align-items-center">
                        {{ todo.label}}
                    </h4>
                </div>

                <form>
                    <div class="input-group mb-3">
                        <input v-model="newTask" type="text" class="form-control" placeholder="Adicione um novo item..."
                        @keyup.enter="addTask" aria-label="Adicione um novo item..." aria-describedby="button-addon2">
                        <button class="btn btn-outline-primary" @click="addTask" type="button"
                            id="buttonSend">Adicionar</button>
                    </div>
                </form>
                <div class="card mb-2" style="width: 20rem;">

                    <div v-if="todo.tasks.length">
                        <TodoTaskCard v-for="task in todo.tasks" :key="task.id" :task="task"
                            @afterDeleting="afterDeleting" />
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
        },

        afterDeleting(task) {
            const idx = this.todo.tasks.findIndex(o => o.id === task.id)
            this.todo.tasks.splice(idx, 1)
        }
    },

    created() {
        this.getTodo()
    },
}
</script>
