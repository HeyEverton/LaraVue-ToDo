<template>
    <div class="card mb-2" style="width: 20rem;">
        <ul class="list-group list-group-flush">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                {{ todo.label }}<br>

                <div class="dropdown d-flex">
                    <a class="btn btn-outline-primary dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Ações
                    </a>
                    <ul class="dropdown-menu">
                        <li>
                            <button @click="onUpdate()" class="dropdown-item">Editar</button>
                        </li>
                        <li>
                            <button @click="onDelete()" class="dropdown-item">Excluir</button>
                        </li>
                    </ul>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
/* eslint-disable */
export default {
    name: 'TodoCardShow',

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
        onUpdate() {
            this.$emit('update')
        },
        
        onDelete() {
            this.$emit('delete')
            
        },
    },

}
</script>
