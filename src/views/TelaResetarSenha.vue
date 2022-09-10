<template>
    <div class="container d-flex justify-content-center mt-10">
        <ValidationObserver tag="form" ref="resetPasswordForm" @submit.stop.prevent="resetPassword">
            <form>

                <div class="mb-3 mt-4">
                    <h1>Recuperar senha</h1>

                    <div :class="`alert alert-${response.color}`" v-if="response.message">
                        <h6>{{response.message}}</h6>
                    </div>

                    <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
                        <label for="email" class="form-label fs-5">E-mail</label>
                        <input v-model="email" type="email" class="form-control" id="firstName"
                            placeholder="Insira seu e-mail">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </ValidationProvider>
                </div>

                <div class="mb-3">
                    <ValidationProvider rules="required|regex:(^[a-zA-Z0-9 _-]+[a-zA-Z0-9-14\-[a-zA-Z0-9-.]+$)"
                        name="Senha" v-slot="{ errors }">
                        <label for="formGroupExampleInput2" class="form-label fs-5">Senha</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="Insira sua senha">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </ValidationProvider>
                    <div class="mt-2">
                        <router-link class="link-primary d-block mb-4" to="/login">Login</router-link>
                    </div>
                </div>

                <div class="d-flex justify-content-center flex-wrap ">
                    <button :disabled="spinner.reset_password" @click="resetPassword" type="submit"
                        class="btn btn-primary fs-2 d-flex align-items-center justify-content-center">
                        <img v-if="spinner.reset_password" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="">
                        Entrar
                    </button>
                </div>

                <br>
            </form>
        </ValidationObserver>
    </div>
</template>
<script>
import { ValidationObserver, ValidationProvider } from 'vee-validate'
import message from '@/utils/messages'

export default {
    name: 'ResetSenha',
    components: {
        ValidationObserver,
        ValidationProvider
    },
    data() {
        return {
            email: '',
            password: '',
            token: '',
            response: {
                color: '',
                message: '',
            },
            spinner: {
                reset_password: false
            },
        }
    },
    methods: {
        async resetPassword() {
            const validator = await this.$refs.resetPasswordForm.validate()
            if (!validator) { return }
            const payload = {
                email: this.email,
                password: this.password,
                token: this.token,
            }
            
            if (this.password.length < 8) {
                this.response.color = 'danger'
                this.response.message = 'A senha precisa de no mínimo 8 caracteres!'
                return 
            }

            this.resetResponse()
            this.spinner.reset_password = true;

            this.$http
                .post('v1/reset-password', payload)
                .then((resp) => {
                    console.log(resp)
                    this.response.color = 'success'
                    this.response.message = 'Senha alterada com succeso!'
                    this.resetForm()
                }).catch((e) => {
                    const errorCode = e?.response?.data?.error || 'ServerError'
                    this.response.color = 'danger'
                    this.response.message = message[errorCode]
                }).finally(() => {
                    this.spinner.reset_password = false;
                    this.$route.push('login')
                    this.spinner.reset_password = false
                });
        },

        resetResponse() {
            this.response.color = ''
            this.response.message = ''
        },

        resetForm() {
            this.$refs.resetPasswordForm.reset()
            this.email = ''
            this.password = ''
            this.token = ''
        }
    },

    created () {
        this.token = this.$route?.query?.token || ''
    },

    beforeRouteEnter(to, from, next) {
        if (!to.query?.token) {
            next({ name: 'login' })
        }

        next();
    }
}
</script>

<style>
.mt-md {
    margin-top: 220px;
}
</style>
