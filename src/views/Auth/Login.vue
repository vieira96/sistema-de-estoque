<template>
    <div class="flex flex-col items-center">
        <LoginMenu />

        <div class="w-full p-2 mb-2 border border-red-400 bg-red-300 text-red-700" v-if="response.message"> {{ response.message }} </div>
        <ValidationObserver
            @submit.stop.prevent="login()" 
            tag="form"
            ref="loginForm"
            class="w-full h-full flex flex-col items-center"
        >
            <ValidationProvider 
                v-slot="{ errors }" 
                rules="required|email" 
                name="E-mail"
                class="mb-2 w-full"
            >
                <input v-model="email" type="email" placeholder="Informe seu e-mail..." class="w-full bg-gray-400 p-3 rounded-sm placeholder-gray-700">
                <div v-if="errors[0]"> {{errors[0]}} </div>
            </ValidationProvider>

            <ValidationProvider
                v-slot="{ errors }"
                rules="required"
                name="Senha" 
                class="w-full mb-2"
            >
                <input v-model="password" type="password" placeholder="Informe sua senha..." class="w-full bg-gray-400 p-3 rounded-sm shadow-lg placeholder-gray-700">
                <div v-if="errors[0]"> {{errors[0]}} </div>

            </ValidationProvider>

            <button
                :class="spinner ? 'cursor-wait' : 'cursor-pointer'" 
                :disabled="spinner"
                type="submit" 
                class="w-full p-2 bg-blue-800 text-gray-300 focus:outline-none flex justify-center"
            >
                <img v-if="spinner" src="@/assets/img/spinner.svg" class="w-6">
                <span v-else>ENTRAR</span>
            </button>

        </ValidationObserver>
    </div>
</template>

<script>
    import LoginMenu from '@/components/Auth/LoginMenu';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';
    import Cookie from '@/service/cookie.js';

    export default {
        
        data() {
            return {
                email: '',
                password: '',
                response: {
                    message: '',
                },
                spinner: false
            }
        },

        components: {
            LoginMenu,
            ValidationObserver,
            ValidationProvider
        },

        methods: {
            async login() {
                let validator = await this.$refs.loginForm.validate();
                if(! validator) {
                    return;
                }

                const payload = {
                    email: this.email,
                    password: this.password,
                }
                this.clearResponse();
                this.spinner = true;
                this.$axios.post('v1/auth/login', payload).then((response) => {
                    Cookie.setToken(`${response.data.token_type} ${response.data.access_token}`);
                    this.$router.push({name: 'home'});
                }).catch((e) => {
                    if(e.response.status === 401) {
                        this.response.message = 'E-mail e/ou senha incorretos.'
                    } else {
                        this.response.message = 'Ocorreu um erro inesperado, tente novamente, se o erro persistir, tente novamente mais tarde, por favor.'
                    }
                }).finally(() => {
                    this.spinner = false;
                })
            },

            clearResponse() {
                this.response.message = '';
            }
        }
    }
</script>
