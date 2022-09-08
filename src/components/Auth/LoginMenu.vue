
<template>
    <div class="d-flex justify-content-center mb-2">
        <router-link to="/login" class="px-2 py-2 nav-link fs-5 ">
            Login
        </router-link>

        <router-link to="/register" class="px-2 py-2 nav-link fs-5 ">
        Cadastre-se
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'LoginMenu',

    data() {
        
    },
    methods: {
        teste() {
            alert('chegou')
        }
    },
}
</script>