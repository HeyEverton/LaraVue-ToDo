<template>
<div class="input-group mb-3">
    <input v-model="task.label" type="text" class="form-control" placeholder="Adicione um novo item..."
        aria-label="Insira o nome da tarefa" aria-describedby="button-addon2">
    <button class="btn btn-outline-primary" @click="addTask" type="button" id="buttonSend">Adicionar</button>
    
    <div class="card mb-2" style="width: 20rem;" >
        <ul class="list-group list-group-flush" v-if="todo.tasks.length">
            <li class="list-group-item d-flex justify-content-between align-items-center">
                {{t.label}} <br>
            </li>
        </ul>
        <div v-else class="text-center text-lg text-gray-600">
            Você ainda não tem nenhuma tarefa.
        </div>
    </div>
</div>
</template>

<script>
/* eslint-disable */

export default {
    name: 'TodoTaskCard',
    props: {
        Task: {
            type: Object,
            default: () => ({})
        },
    },
    data() {
        return {

        }
    },

}
</script>

<style>

</style>nit