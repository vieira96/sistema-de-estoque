<template>
    <div class="flex flex-col">
        <div class="w-full flex items-center">
            <img class="w-14 mr-2" src="@/assets/img/product.svg" alt="">
            <span class="text-3xl text-gray-400">Produtos</span>
        </div>
        
        <div class="flex justify-between items-end mb-4">
            <button @click.stop.prevent="modalToggle" class="bg-green-500 p-2 w-48 mt-4 flex rounded-md">
                <img src="@/assets/img/new-product.svg" class="w-6">
                <span class="ml-2 text-white">Adicionar produto</span>
            </button>

            <form @submit.stop.prevent="search()" class="flex p-1 h-11 rounded-lg bg-white">
                <input 
                  v-model="research" 
                  type="text" 
                  class="outline-none border-none px-4 text-gray-500" 
                  placeholder="Pesquiser por um produto..."
                >
                <button v-if="! spinner.search" class="focus:outline-none">
                    <img src="@/assets/img/search.svg" class="w-7 bg-white">
                </button>
                <img v-else src="@/assets/img/spinner.svg" class="w-7">
            </form>
        </div>
        <h3 class="p-2 bg-blue-500 text-gray-200 w-1/5 rounded-sm" v-if="response.message">{{response.message}}</h3>
        <div v-if="spinner.loading" class="flex flex-col justify-center items-center mt-20">
          <h1 class="text-gray-300 text-2xl">Buscando produtos...</h1>
          <img class="w-20" src="@/assets/img/spinner.svg">
        </div>
        <div v-else>
          <div class="text-gray-300 mb-4">
            <div v-if="title" class="flex">
              <span class="mr-3">Pesquisando por "{{title}}".</span>
              <img @click.stop.prevent="cancelSearch" src="@/assets/img/cancel.svg" class="w-3 cursor-pointer">
            </div>
          </div>
          
          <Table v-if="products.length" @update="selectProduct($event)" @delete="destroy($event)" />

          <div class="text-gray-300 text-xl" v-else>
            <span v-if="title === ''">
              0 produtos cadastrados atualmente.
            </span>

            <span v-else>
              Nenhum produto encontrado.
            </span>
          </div>
        </div>
        
        <Modal 
          v-if="selectedProduct.id || modalOpenned" 
          @cancel="cancel()" 
          @create="create($event)" 
          @update="update($event)"
        />
    </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState, mapMutations } = createNamespacedHelpers('product');
import Modal from '@/components/Modal';
import Table from '@/components/Table.vue';


export default {
  data() {
    return {
      modalOpenned: false,
      research: '',
      spinner:{
        loading: true,
        search: false,
      },
      title: '',
    }
  },
  
  components: {
    Modal,
    Table,
  },

  computed:{
    ...mapState({
      products: state => state.products,
      selectedProduct: state => state.selectedProduct,
      response: state => state.response,
    })
  },

  methods: {
    ...mapMutations([
      'LIST_PRODUCTS',
      'CREATE_PRODUCT',
      'UPDATE_PRODUCT',
      'DELETE_PRODUCT',
      'SELECT_PRODUCT',  
      'DISPLAY_RESPONSE',  
    ]),

    modalToggle() {
      this.modalOpenned = ! this.modalOpenned;
    },

    create(product) {
      this.$axios.post('/v1/products', product).then((response) => {
        this.CREATE_PRODUCT(response.data.data);
      }).finally(()=> {
        this.modalToggle();
        this.DISPLAY_RESPONSE("Novo produto criado com sucesso!");
      })
    },

    search() {
      this.spinner.search = true;
      this.spinner.loading = true;
      let payload = {
        name: this.research
      }
      this.$axios.post('/v1/product/search', payload).then((response) => {
        this.LIST_PRODUCTS(response.data.data)
      }).finally(() => {
        this.title = this.research
        this.spinner.search = false;
        this.spinner.loading = false;
      })
    },

    cancelSearch() {
      this.research = '';
      this.title = '';
      this.getAllProducts();
    },

    getAllProducts() {
      this.spinner.loading = true;
      this.$axios.get('/v1/products').then((response) => {
        this.LIST_PRODUCTS(response.data.data)
      }).finally(() => {
        this.spinner.loading = false;
      })
    },

    cancel() {
      if(this.selectedProduct.id) {
        this.SELECT_PRODUCT({});
      } else {
        this.modalToggle();
      }
    },

    update(product) {
      this.$axios.put(`/v1/products/${product.id}`, product).then((response) => {
        this.UPDATE_PRODUCT(response.data.data);
        this.DISPLAY_RESPONSE("Produto editado com sucesso!");
      }).finally(() => {
        this.SELECT_PRODUCT({});
      });
    },

  },

  created() {
    this.getAllProducts();
  }
}
</script>
