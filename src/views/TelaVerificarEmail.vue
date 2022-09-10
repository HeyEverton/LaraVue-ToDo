<template>
    <div>

        <div class="d-inline-flex mt-5">
            <img v-if="spinner.verify_email" src="@/assets/img/spinner.svg" class="thumbnail mr-2" alt="">
        </div>

        <div :class="`alert alert-${response.color}`" v-if="response.message">
            <h3>{{response.message}}</h3>
        </div>

    </div>
</template>
<script>
import message from '@/utils/messages';

export default {
    name: 'VerificarEmail',

    data() {
        return {
            token: '',
            response: {
                color: '',
                message: '',
            },
            spinner: {
                verify_email: false
            },
        }
    },

    methods: {
        verifyEmail() {
            console.log(this.token)
            const payload = {
                token: this.token
            }

            this.$http
                .post('v1/verify-email', payload)
                .then(() => {
                    this.response.color = 'success';
                    this.response.message = 'Seu e-mail foi verificado com sucesso!'
                })
                .catch((e) => {
                    const errorCode = e?.response?.data?.error || 'Server error';
                    this.response.color = 'danger';
                    this.response.message = message[errorCode];
                })
        }
    },

    created() {
        this.token = this.$route?.query?.token || '';
        this.verifyEmail();
    },

    beforeRouteEnter(to, from, next) {
        if (!to.query?.token) {
            next({ name:'login' })
        }

        next();
    }
}
</script>

<style>
.thumbnail {
    width: 35px;
    height: 35px;
    margin-right: 20px
}
</style>
