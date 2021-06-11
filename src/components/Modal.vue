<template>
    <div class="fixed w-screen h-screen left-0 top-0 flex flex-col justify-center items-center">
        <ValidationObserver
            ref="productForm"
            tag="form"
            @submit.stop.prevent="submit()" 
            class="w-2/5 bg-gray-200 p-5 flex flex-col relative"
        >
            <img 
                src="@/assets/img/cancel.svg" 
                alt=""
                class="absolute top-0 right-0 w-6 h-6 bg-red-500 rounded-full cursor-pointer"
                @click.stop.prevent="cancel()"
            >
            <h2 class="text-gray-600 mb-2 text-2xl" v-if="selectedProduct.id">Editando produto: "{{selectedProduct.name}}".</h2>
            <h2 class="text-gray-600 mb-2 text-2xl" v-else>Novo produto</h2>
            <ValidationProvider 
                class="mb-2"
                v-slot="{ errors }" 
                rules="required" 
                name="nome do produto"
            >
                <input v-model="product.name" class="focus:outline-none p-3 rounded-sm w-full" type="text" placeholder="Nome do produto...">
                <div class="text-red-400" v-if="errors[0]"> {{errors[0]}} </div>
            </ValidationProvider>
            <ValidationProvider
                class="mb-2"
                v-slot="{errors}"
                name="preço do produto"
                rules="required"
            >
                <input v-model="product.price" pattern="^[0-9]{1,5}(\.[0-9]{1,2})?$" class="focus:outline-none p-3 w-full rounded-sm" type="text" placeholder="Preço do produto...">
                <div class="text-red-400" v-if="errors[0]"> {{errors[0]}} </div>
            </ValidationProvider>
            <ValidationProvider
                rules="min_value:0|required"
                v-slot="{errors}"
                name="quantidade de produto"
                class="mb-2"
            >
                <input v-model="product.quantity" min="0" class="focus:outline-none w-full p-3 rounded-sm" type="number" placeholder="Quantidade de produto...">
                <div class="text-red-400" v-if="errors[0]"> {{errors[0]}} </div>
            </ValidationProvider>
            <button 
                :disabled="spinner" 
                :class=" spinner ? 'cursor-wait' : 'cursor-pointer'" 
                class="p-3 bg-green-500 text-gray-100 flex justify-center"
            >
                <img v-if="spinner" src="@/assets/img/spinner.svg" class="w-6">
                <div v-else>
                    <span v-if="selectedProduct.id">Salvar</span>
                    <span v-else>Cadastrar</span>
                </div>
            </button>
        </ValidationObserver>
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('product');

import { ValidationObserver, ValidationProvider } from 'vee-validate';
export default {
    data() {
        return {
            product: {
                name: '',
                price: '',
                quantity: '',
            },
            spinner: false
        }
    },

    computed: {
        ...mapState({
            selectedProduct: state => state.selectedProduct,
        })
    },

    components: {
        ValidationObserver,
        ValidationProvider
    },

    methods: {
        async submit() {
            let validator = await this.$refs.productForm.validate();
            if(! validator) {
                return
            }
            this.spinner = true;
            this.product.price = Number.parseFloat(this.product.price).toFixed(2);
            if(this.selectedProduct.id) {
                this.$emit('update', this.product)
            } else {
                this.$emit('create', this.product)
            }
        },
        cancel() {
            this.$emit('cancel');
        }
    },

    created() {
        if (this.selectedProduct.id) {
            this.product = Object.assign({}, this.selectedProduct);
        }
    }
}
</script>