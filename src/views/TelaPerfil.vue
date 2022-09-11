<template>
    <div class="container d-flex justify-content-center mt-10">
        <NavBar />

        <form>

            <div class="mb-3 mt-4">
                <h1 class="mb-4">Meu perfil</h1>
                <!-- <div :class="`alert alert-${response.color}`" v-if="response.message">
                        <h6>{{response.message}}</h6>
                    </div>-->
                <label for="email" class="form-label fs-5">Primeiro nome</label>
                <input v-model="firstName" type="text" class="form-control" id="firstName" placeholder="Insira seu nome">
                <!-- <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>-->
            </div>

            <div class="mb-3 mt-4">

                <!-- <div :class="`alert alert-${response.color}`" v-if="response.message">
                        <h6>{{response.message}}</h6>
                    </div>-->
                <label for="email" class="form-label fs-5">Sobrenome</label>
                <input v-model="lastName" type="text" class="form-control" id="lastName" placeholder="Insira seu sobrenome">
                <!-- <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>-->
            </div>
            <div class="mb-3 mt-4">
                <!-- <div :class="`alert alert-${response.color}`" v-if="response.message">
                        <h6>{{response.message}}</h6>
                    </div>-->
                <label for="email" class="form-label fs-5">E-mail</label>
                <input v-model="email" type="email" class="form-control" id="email" placeholder="Insira seu e-mail">
                <!-- <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div>-->
            </div>

            <div class="mb-3">


                <label for="formGroupExampleInput2" class="form-label fs-5">Senha</label>
                <input v-model="password" type="password" class="form-control" id="password"
                    placeholder="Insira sua senha">

                <!-- <div class="text-danger fs-6" v-if="!!errors[0]">
                            {{errors[0]}}
                        </div> -->

                <!-- <div class="mt-2">
                    <router-link class="link-primary d-inline-block" to="/esqueci-senha">Esqueci minha senha
                    </router-link>
                </div> -->
            </div>

            <div class="d-flex justify-content-center flex-wrap ">
                <button @click="updateUser" type="submit" class="btn btn-primary fs-2 d-flex align-items-center justify-content-center">
                    <!-- <img  src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt=""> -->
                    Salvar
                </button>
            </div>
        </form>
    </div>
</template>
<script>
import NavBar from '@/components/Partials/TheHeader'
import {mapState} from 'vuex'

export default {
    name: 'TelaPerfil',
    components: {
        NavBar
    },

    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        }
    },

    methods: {
        updateUser() {
            alert('chegou')
        }
    },

    created () {
        this.firstName = this.user.first_name
        this.lastName = this.user.last_name
        this.email = this.user.email
    },

    computed: {
        ...mapState({
            user: state => state.user.user
        }),
    },
}
</script>
