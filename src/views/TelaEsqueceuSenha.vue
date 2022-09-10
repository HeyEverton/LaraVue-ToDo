<template>
    <div class="container d-flex justify-content-center mt-10">
        <div class="mb-3 mt-10 col-md-8">
            <ValidationObserver ref="forgotPasswordForm" tag="form" @submit.stop.prevent="sendEmail">
                <div :class="`alert alert-${response.color}`" v-if="response.message">
                    <h6>{{response.message}}</h6>
                </div>

                <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
                    <label for="email" class="form-label fs-5">E-mail</label>
                    <input v-model="email" type="email" class="form-control" id="email" placeholder="Insira seu email">
                    <div class="text-danger fs-6" v-if="!!errors[0]">
                        {{errors[0]}}
                    </div>
                    <span class="mb-4 text-muted">Enviaremos um e-mail para redefinir sua senha.</span>
                </ValidationProvider>
            </ValidationObserver>

            <div class="d-flex justify-content-center flex-wrap mt-5 ">
                <button @click="sendEmail" :disabled="spinner.forgot_password" type="submit"
                    class="btn btn-primary fs-2 d-flex align-items-center justify-content-center">
                    <img v-if="spinner.forgot_password" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="">
                    Recuperar senha
                </button>
            </div>
        </div>
    </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import message from '@/utils/messages'

export default {
    name: 'EsqueceuSenha',

    components: {
        ValidationObserver,
        ValidationProvider,
    },

    data() {
        return {
            email: '',
            response: {
                color: '',
                message: '',
            },
            spinner: {
                forgot_password: false
            },
        }
    },

    methods: {
        async sendEmail() {
            const validator = await this.$refs.forgotPasswordForm.validate()
            if (!validator) { return }
            const payload = {
                email: this.email
            }

            this.resetResponse()
            this.spinner.forgot_password = true

            this.$http
                .post('v1/forgot-password', payload)
                .then(() => {
                    this.response.color = 'success'
                    this.response.message = 'Um e-mail com instruções para recuperar sua senha foi enviado.'
                }).catch((e) => {
                    const errorCode = e?.response?.data?.error || 'ServerError'
                    this.response.color = 'danger'
                    this.response.message = message[errorCode];
                }).finally(() => {
                    this.spinner.forgot_password = false
                })

        },

        resetResponse() {
            this.response.color = ''
            this.response.message = ''
        },

        resetForm() {
            this.$refs.forgotPasswordForm.reset()
            this.email = ''
        }
    },
}
</script>

<style>
.mt-10 {
    margin-top: 100px
}
</style>