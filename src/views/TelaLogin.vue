<template>
    <div class="container d-flex justify-content-center">
       
        <form>
            <div class="mb-3 mt-4">
                <label for="formGroupExampleInput" class="form-label fs-5">E-mail</label>
                <input v-model="email" type="email" class="form-control" id="firstName" placeholder="Insira seu nome">
            </div>

            <div class="mb-3">
                <label for="formGroupExampleInput2" class="form-label fs-5">Senha</label>
                <input v-model="password" type="password" class="form-control" id="password" placeholder="Insira sua senha">
                <router-link class="link-primary" to="/register">Esqueci minha senha</router-link>
            </div>

            <div class="d-flex justify-content-center flex-wrap ">
                <button type="submit" @click="loginUser" class="btn btn-primary fs-2">Entrar</button>
            </div>
            <br>
            <router-link class="link-primary fs-5" to="/register">Ainda não tem uma conta? Registre-se!</router-link>
        </form>



    </div>
</template>


<script>

import Cookie from 'js-cookie';


export default {

    name: 'TelaLogin',

    components: {
       
    },

    data() {
        return {
            email: '',
            password: '',
        }
    },

    methods: {
        loginUser() {
            const payload = {
                email: this.email,
                password: this.password
            };

            this.$http.post('v1/login', payload)
                .then((response => {
                    const token = `${response.data.token_type} ${response.data.access_token}`
                    Cookie.set('_todolist_token', token, { expires: 30 });

                    this.$store.commit('user/STORE_USER', response.data.data);
            }))
        }
    },

}
</script>