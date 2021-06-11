<template>
    <div class="w-full h-screen flex flex-col justify-center items-center">
        <h1 class="text-gray-300 text-2xl">Saindo...</h1>
        <img class="w-24" src="@/assets/img/spinner.svg" alt="">
    </div>
</template>

<script>
import Cookie from '@/service/cookie.js';

export default {
    
    name: "Logout",

    methods: {
        logout() {
            this.$axios.get('/v1/auth/logout').then(() => {
                Cookie.deleteToken();
                this.$router.push({name: 'login'})
            })
        }
    },

    created() {
        this.logout()
    }
}
</script>