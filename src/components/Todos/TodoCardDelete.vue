<template>
    <div class="d-flex align-items-center ">
        <div class="d-flex align-items-center justify-content-between">
            <div class="text-danger">
                Tem certeza que deseja excluir <strong>"{{todo.label}}"</strong>?
            </div>
        </div>
        <li class="list-group-item">
            <button class="btn btn-outline-primary" @click.stop.prevent="onCancel">Cancelar</button>
            <button class="btn btn-outline-danger" @click.stop.prevent="onDelete">Sim, excluir</button>
        </li>
    </div>

</template>
<script>
/* eslint-disable */
export default {
    name: 'TodoCardDelete',

    props: {
        todo: {
            type: Object,
            default: () => ({})
        },
    },

    data() {
        return {

        }
    },

    methods: {
        onCancel() {
            this.$emit('cancel')
        },

        onDelete() {
            this.$http.delete(`v1/todos/${this.todo.id}`)
                .then(() => {
                    this.$emit('afterDeleting', this.todo)
                })
        }
    },
}
</script>
