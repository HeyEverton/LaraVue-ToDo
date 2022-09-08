<template>
    <div class="w-screen h-screen flex item-center justify-center">
        <div class="w-full sm:w-1/2 lsg:w-1/3 xl:w-1/3 mx-auto">
            <router-view/>
        </div>
    </div>
</template>


<script>

export default {
    name: 'Auth',

    data() {
        return {

        }
    },


    methods: {
        test() {
            alert('chegou')
        }
    },

}
</script>