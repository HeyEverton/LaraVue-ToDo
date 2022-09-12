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
                <!-- <button @click.stop.prevent="changeStateToUpdate" class="btn btn-primary mr-3">Editar</button> -->
                <!-- <button @click.stop.prevent="changeStateToDelete" class="btn btn-primary">Excluir</button> -->
            </li>
        </ul>
    </div>
</template>
<script>
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
