<template>
    <div class="container d-flex justify-content-center">
       
        <form>

        <div class="mb-3 mt-4">
            <label for="formGroupExampleInput" class="form-label fs-5">Nome</label>
            <input type="text" class="form-control" id="firstName" placeholder="Insira seu nome">
        </div>

        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label fs-5">Sobrenome</label>
            <input type="text" class="form-control" id="lastName" placeholder="Insira seu sobrenome">
        </div>

        <div class="mb-3">
            <label for="formGroupExampleInput2" class="form-label fs-5">E-mail</label>
            <input type="email" class="form-control" id="email" placeholder="Insira seu e-mail">
        </div>

        <div class="mb-1">
            <label for="formGroupExampleInput2" class="form-label fs-5">Senha</label>
            <input type="password" class="form-control" id="password" placeholder="Insira sua senha">
        </div>
        <div class="d-flex justify-content-center flex-wrap ">
            <button type="submit" @click="registerUser" class="btn btn-primary fs-5 mt-4">Enviar</button>
        </div>
            <br>
            <router-link class="link-primary fs-5" to="/login">Já tem uma conta? Faça login!</router-link>
        </form>
    </div>
</template>


<script>


export default {

    name: 'TelaLogin',

    components: {
      
    },

    data() {
        return {

        }
    },

    methods: {
        registerUser() {
            alert('chegou')
        }
    },

}
</script>