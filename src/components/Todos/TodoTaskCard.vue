<template>
    <div>
       
        <div class="card mb-2" style="width: 20rem;">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <input type="text" v-model="task.label" ref="input" placeholder="Digite sua tarefa"
                        @input="handleInput">

                    <div style="cursor: pointer;" @click.stop.prevent="task.is_complete = !task.is_complete">
                        <svg v-if="task.is_complete" class="text-success" viewBox="0 0 20 20" fill="none"
                            style="width:25px;" xmlns="http://www.w3.org/2000/svg">

                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM13.7071 8.70711C14.0976 8.31658 14.0976 7.68342 13.7071 7.29289C13.3166 6.90237 12.6834 6.90237 12.2929 7.29289L9 10.5858L7.70711 9.29289C7.31658 8.90237 6.68342 8.90237 6.29289 9.29289C5.90237 9.68342 5.90237 10.3166 6.29289 10.7071L8.29289 12.7071C8.68342 13.0976 9.31658 13.0976 9.70711 12.7071L13.7071 8.70711Z"
                                fill="currentColor" />
                        </svg>

                        <svg v-else xmlns="http://www.w3.org/2000/svg" style="width:20px;" fill="currentColor"
                            class="bi bi-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                        </svg>

                    </div>

                    <svg class="ml-3 h-4 w-4 text-gray-500" viewBox="0 0 24 24" style="width:25px;cursor:pointer;"
                        fill="none" stroke="currentColor" @click.stop.prevent="deleteTask"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    </svg>


                </li>
            </ul>
        </div>

        <!-- <ul class="list-group list-group-flush" v-if="todo.tasks.length">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <input type="text" v-model="task.label">
        
            </li>
        </ul> -->
        <!-- <div class="card mb-2" style="width: 20rem;">
            <ul class="list-group list-group-flush">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                    <input v-model="task.label" ref="input" type="text" class="form-control"
                        placeholder="Digite sua tarefa..." aria-label="Digite sua tarefa..."
                        aria-describedby="button-addon2" @input="handleInput">
                    {{t.label}} <br>
                </li>
            </ul>

        </div> -->
    </div>
</template>

<script>
/* eslint-disable */
import { debounce } from 'lodash';


export default {
    name: 'TodoTaskCard',

    // props: {
    //     task: {
    //         type: Object,
    //         default: () => ({})
    //     },
    // },

    data() {
        return {

        }
    },

    watch: {
        'task.is_complete'() {
            this.updateTask()
        }
    },

    methods: {
        updateTask() {
            const payload = {
                label: this.task.label,
                is_complete: this.task.is_complete,
            }
            this.$http.put(`v1/todo-tasks/${this.task.id}`, payload)
        },

        deleteTask() {
            this.$http.delete(`v1/todo-tasks/${this.task.id}`)
                .then(() => {
                    this.$emit('afterDeleting', this.task)
                })
        },

        handleInput: debounce(function () {
            this.updateTask()
        }, 300)
    },

}
</script>
