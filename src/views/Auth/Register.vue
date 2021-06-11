<template>
    <div class="flex flex-col items-center">
        <LoginMenu />
        <ValidationObserver
            @submit.stop.prevent="register()" 
            tag="form"
            class="w-full h-full flex flex-col"
            ref="registerForm"
        >
            <div class="flex w-full mb-2">
                <ValidationProvider v-slot="{ errors }" rules="required" name="nome" class="w-1/2 mr-2">
                    <input v-model="firstName" type="text" placeholder="Informe seu nome..." class=" bg-gray-400 p-3 rounded-sm shadow-lg placeholder-gray-700 w-full">
                    <div class="text-red-400" v-if="errors[0]">{{errors[0]}}</div>
                </ValidationProvider>
                
                <div class="w-1/2">
                    <input v-model="lastName" type="text" placeholder="Informe seu sobrenome..." class=" bg-gray-400 p-3 rounded-sm shadow-lg placeholder-gray-700 w-full">
                </div>
            </div>
            <ValidationProvider v-slot="{ errors }" rules="required|email" name="email" class="w-full mb-2">
                <input v-model="email" type="email" placeholder="Informe seu email..." class=" bg-gray-400 p-3 rounded-sm shadow-lg placeholder-gray-700 w-full">
                <div class="text-red-400" v-if="errors[0]">{{errors[0]}}</div>
            </ValidationProvider>
           
            <ValidationProvider v-slot="{ errors }" rules="required" name="senha" class="w-full mb-2">
                <input v-model="password" type="password" placeholder="Escolha sua senha..." class=" bg-gray-400 p-3 rounded-sm shadow-lg placeholder-gray-700 col-span-full w-full">
                <div class="text-red-400" v-if="errors[0]">{{errors[0]}}</div>
            </ValidationProvider>

            <div v-if="response.message" :class="`w-full mb-2 p-2 bg-${response.color}-500 text-${response.color}-200`">{{response.message}}</div>

            <button :disabled="spinner" type="submit" class="w-full p-2 bg-blue-800 text-gray-300 flex justify-center border-0 focus:outline-none" :class="spinner ? 'cursor-wait' : 'cursor-pointer'">
                <img v-if="spinner" class="w-6" src="@/assets/img/spinner.svg" alt="">
                <span v-else>CADASTRAR</span>
            </button>
        </ValidationObserver>
    </div>
</template>

<script>
    import LoginMenu from '@/components/Auth/LoginMenu';
    import { ValidationObserver, ValidationProvider } from 'vee-validate';

    export default {
        
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
                spinner: false,
            }
        },

        components: {
            LoginMenu,
            ValidationObserver,
            ValidationProvider,
        },

        methods: {

            async register() {
                let validator = await this.$refs.registerForm.validate();
                if(! validator) {
                    return;
                }
                const payload = {
                    first_name: this.firstName,
                    last_name: this.lastName,
                    email: this.email,
                    password: this.password,
                }

                this.clearResponse();
                this.spinner = true;

                this.$axios.post('/v1/register', payload).then(()=> {
                    this.response.message = "Usuário cadastrado com sucesso!"
                    this.response.color = "green"
                }).catch((e) => {
                    if (e.response.data.errors.email[0]) {
                        this.response.message = "E-mail já cadastrado em nosso sistema."
                    } else {
                        this.response.message = "Ocorreu um erro inesperado, por favor, tente novamente mais tarde!"
                    }
                    this.response.color = "red"
                }).finally(() => {
                    this.spinner = false;
                })
            },
            
            clearResponse() {
                this.response.message = '';
                this.response.color = '';
            }
        }
    }
</script>
