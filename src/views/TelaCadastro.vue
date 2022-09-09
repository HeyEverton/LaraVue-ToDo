<template>
    <div class="container d-flex justify-content-center mt-10">
        <ValidationObserver ref="registerForm" tag="form" @submit.stop.prevent="registerUser">

            <div :class="`alert alert-${response.color}`" v-if="response.message">
                <h6>{{response.message}}</h6>
            </div>

            <form>
                <ValidationProvider v-slot="{errors}" rules="required" name="Primeiro nome">
                    <div class="mb-3 mt-4">
                        <label for="formGroupExampleInput" class="form-label fs-5">Nome</label>
                        <input type="text" v-model="firstName" class="form-control" id="firstName"
                            placeholder="Insira seu nome">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </div>
                </ValidationProvider>

                <div class="mb-3">
                    <label for="formGroupExampleInput2" class="form-label fs-5">Sobrenome</label>
                    <input type="text" v-model="lastName" class="form-control" id="lastName"
                        placeholder="Insira seu sobrenome">
                </div>

                <ValidationProvider rules="required|email" name="E-mail" v-slot="{ errors }">
                    <div class="mb-3">
                        <label for="formGroupExampleInput2" class="form-label fs-5">E-mail</label>
                        <input type="email" v-model="email" class="form-control" id="email"
                            placeholder="Insira seu e-mail">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </div>
                </ValidationProvider>

                <ValidationProvider rules="required|regex:(^[a-zA-Z0-9 _-]+[a-zA-Z0-9-14\-[a-zA-Z0-9-.]+$)" name="Senha"
                    v-slot="{ errors }">
                    <div class="mb-1">
                        <label for="formGroupExampleInput2" class="form-label fs-5">Senha</label>
                        <input type="password" v-model="password" class="form-control" id="password"
                            placeholder="Insira sua senha">

                        <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>
                    </div>
                </ValidationProvider>

                <div class="d-flex justify-content-center flex-wrap ">
                    <button type="submit" @click="registerUser" :disabled="spinner.register"
                        class="btn btn-primary fs-5 mt-4 fs-2 d-flex align-items-center justify-content-center">
                        <img v-if="spinner.register" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="">
                        Enviar
                    </button>
                </div>

                <br>
                <router-link class="link-primary fs-5" to="/login">Já tem uma conta? Faça login!</router-link>

            </form>
        </ValidationObserver>
    </div>
</template>


<script>
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
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            response: {
                color: '',
                message: '',
            },
            spinner: {
                register: false
            },
        };
    },

    methods: {

        async registerUser() {
            const validator = await this.$refs.registerForm.validate();
            if (!validator) {
                return;
            }

            this.resetResponse();

            const payload = {
                first_name: this.firstName,
                last_name: this.lastName,
                email: this.email,
                password: this.password
            };

            this.spinner.register = true;

            this.$http.post('v1/register', payload)
                .then(() => {
                    this.response.color = 'success';
                    this.response.message = 'Seu cadastro foi feito com sucesso!'

                    this.resetForm();

                }).catch((e) => {
                    this.spinner.register = true;

                    const errorCode = e?.response?.data?.error || 'Server error';
                    this.response.color = 'danger';
                    this.response.message = message[errorCode];
                }).finally(() => {
                    this.spinner.register = false;
                });
        },

        resetResponse() {
            this.response.color = '';
            this.response.message = '';
        },

        resetForm() {
            this.$refs.registerForm.reset();

            this.first_name = '';
            this.last_name = '';
            this.email = '';
            this.password = '';
        }
    },

}
</script>

<style scoped>
.mt-10 {
    margin-top: 80px;
}

.thumbnail {
    width: 35px;
    height: 35px;
    margin-right: 20px
}
</style>