<template>
    <div>
        <header>
            <nav class="navbar navbar-expand-md navbar-dark fixed-top bg-dark mb-3">
                <div class="container-fluid">
                    <router-link to="/" class="link nav-link navbar-brand">VueJs</router-link>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false"
                        aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarCollapse">
                        <ul class="navbar-nav me-auto mb-2 mb-md-0">
                            <li class="nav-item">
                                <router-link class="nav-link" to="/">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/login">Login</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link class="nav-link" to="/registro">Cadastre-se</router-link>
                            </li>
                        </ul>
                        <div class="btn-group dropstart d-flex">
                            <button type="button" class="btn btn-secondary dropdown-toggle d-flex"
                                data-bs-toggle="dropdown" aria-expanded="false">
                                <img class="d-flex color" src="@/assets/img/person-circle.svg" alt="">
                            </button>
                            <ul class="dropdown-menu">
                                <li>
                                    <router-link class="nav-link" to="profile">
                                        Meu perfil
                                    </router-link>
                                </li>
                                <li><router-link class="nav-link" to="profile">
                                   Logout
                                </router-link></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
export default {
    name: 'NavBar',

    methods: {

    },
}
</script>

<style>

</style>