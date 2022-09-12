<template>
    <div class="card mb-2" style="width: 20rem;">
        <ul class="list-group list-group-flush">
            <TodoCardShow v-if="isShowing" :todo="todo" @update="changeStateToUpdate" @delete="changeStateToDelete" />

            <TodoCardUpdate :todo="todo" v-if="isUpdating" @cancel="changeStateToShow" />

            <TodoCardDelete :todo="todo" v-if="isDeleting" @cancel="changeStateToShow" @afterDeleting="afterDeleting" />
        </ul>
    </div>
</template>
<script>
/* eslint-disable */
import TodoCardShow from '@/components/Todos/TodoCardShow'
import TodoCardUpdate from '@/components/Todos/TodoCardUpdate'
import TodoCardDelete from '@/components/Todos/TodoCardDelete'

export default {
    name: 'TodoCard',
    props: {
        todo: {
            type: Object,
            default: () => ({}),
        },
    },

    components: {
        TodoCardShow,
        TodoCardUpdate,
        TodoCardDelete
    },

    computed: {
        isShowing() {
            return this.todo.state === 'show'
        },

        isUpdating() {
            return this.todo.state === 'update'
        },
        isDeleting() {
            return this.todo.state === 'delete'
        },
    },

    methods: {
        changeStateToShow() {
            this.todo.state = 'show'
        },

        changeStateToUpdate() {
            this.todo.state = 'update'
        },

        changeStateToDelete() {
            this.todo.state = 'delete'
        },

        afterDeleting(todo) {
            this.$emit('afterDeleting', todo)
        }
    },
}
</script>
