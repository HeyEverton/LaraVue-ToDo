<template>
    <div class="d-flex align-items-center ">
        <validationObserver ref="todoUpdateForm" tag="form" @sumbit.prevent.stop="onSave">

            <div class="d-flex align-items-center justify-content-between">
                <li class="list-group-item">
                    <ValidationProvider v-slot="{ errors }" rules="required" name="Label">
                        <input v-model="localLabel" ref="label" type="text" class="form mb-2" placeholder="Digite o nome da lista">
                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                        <button class="btn btn-outline-danger" @click.stop.prevent="onCancel">Cancelar</button>
                        <button class="btn btn-primary" @click.stop.prevent="onSave">Salvar</button>
                    </ValidationProvider>
                </li>
            </div>

        </validationObserver>
    </div>

</template>

<script>
/* eslint-disable */
import { ValidationObserver, ValidationProvider } from 'vee-validate'
export default {
    name: 'TodoCardUpdate',

    components: {
        ValidationObserver,
        ValidationProvider
    },

    props: {
        todo: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            localLabel: this.todo.label,
        }
    },

    methods: {
        onCancel() {
            this.$emit('cancel')
        },

        async onSave() {
            const validator = await this.$refs.todoUpdateForm.validate()
            if(!validator) { return }

            const payload = {
                label: this.localLabel
            }
            console.log(this.todo.id)
            // this.$http
            //     .put(`v1/todos/${this.todo.id}`, payload)
            //     .then(() => {
            //         this.todo.label = this.localLabel
            //         this.onCancel()
            //     })
        }
    },

    mounted () {
        this.$refs.label.focus()
    },
}
</script>
