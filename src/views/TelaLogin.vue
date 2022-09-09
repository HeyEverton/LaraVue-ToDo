<template>
    <div class="container d-flex justify-content-center mt-10">

        <ValidationObserver tag="form" ref="loginForm" @submit.stop.prevent="loginUser">
            <form>

                <div class="mb-3 mt-4">

                    <div :class="`alert alert-${response.color}`" v-if="response.message">
                        <h6>{{response.message}}</h6>
                    </div>

                    <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
                        <label for="email" class="form-label fs-5">E-mail</label>
                        <input v-model="email" type="email" class="form-control" id="firstName"
                            placeholder="Insira seu nome">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </ValidationProvider>
                </div>

                <div class="mb-3">
                    <ValidationProvider rules="required" name="Senha" v-slot="{ errors }">
                        <label for="formGroupExampleInput2" class="form-label fs-5">Senha</label>
                        <input v-model="password" type="password" class="form-control" id="password"
                            placeholder="Insira sua senha">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </ValidationProvider>

                    <router-link class="link-primary mt-3" to="/register">Esqueci minha senha</router-link>
                </div>

                <div class="d-flex justify-content-center flex-wrap ">
                    <button :disabled="spinner.login" 
                    @click="loginUser" 
                    type="submit" class="btn btn-primary fs-2 d-flex align-items-center justify-content-center">
                        <img v-if="spinner.login" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="" >
                        Entrar</button>
                </div>

                <br>
                <router-link class="link-primary fs-5" to="/register">Ainda não tem uma conta? Registre-se!
                </router-link>
            </form>
        </ValidationObserver>

    </div>
</template>


<script>

import Cookie from 'js-cookie';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import message from '@/utils/messages';


export default {

    name: 'TelaLogin',

    components: {
        ValidationObserver,
        ValidationProvider
    },

    data() {
        return {
            email: '',
            password: '',
            response: {
                message: '',
                color: '',
            },
            spinner: {
                login: false
            },
        }
    },

    methods: {
        async loginUser() {
            const validator = await this.$refs.loginForm.validate();
            if (!validator) { return; }
            const payload = {
                email: this.email,
                password: this.password
            };

            this.resetResponse();

            this.spinner.login = true;

            this.$http
                .post('v1/login', payload)
                .then((response => {
                    const token = `${response.data.token_type} ${response.data.access_token}`
                    Cookie.set('_todolist_token', token, { expires: 30 });
                    this.$store.commit('user/STORE_USER', response.data.data);
                }))
                .catch((e) => {
                    this.spinner.login = false;
                    const errorCode = e?.response?.data?.error || 'Server error';
                    this.response.color = 'danger';
                    this.response.message = message[errorCode];
                })
        },

        resetResponse() {
            this.response.message = '';
        }
    },

}
</script>

<style scoped>
.mt-10 {
    margin-top: 100px
}

.thumbnail {
    width: 35px;
    height: 35px;
    margin-right: 20px
}
</style>