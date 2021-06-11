<template>
  <tr>
    <td>{{product.name}}</td>
    <td>R$: {{product.price}}</td>
    <td>{{product.quantity}}</td>
    <td>{{product.created_at}}</td>
    <td class="flex items-center">
        <button 
            @click.stop.prevent="SELECT_PRODUCT(product)" 
            class="flex flex-col justify-center items-center mr-2 focus:outline-none"
        >
            <img src="@/assets/img/pencil.svg" class="w-4">
            <span>editar</span>
        </button>

        <button
            :class="spinner ? 'cursor-wait' : 'cursor-pointer'" 
            :disabled="spinner"
            @click.stop.prevent="destroy(product)" 
            class="flex flex-col justify-center items-center focus:outline-none"
        >
            <img src="@/assets/img/trash.svg" class="w-4">
            <span>apagar</span>
        </button>
    </td>
</tr>
</template>

<script>

import {createNamespacedHelpers} from 'vuex';
const { mapMutations } = createNamespacedHelpers('product');

export default {
  name: 'TableItem',
  props: {
    product: {
      Type: Object,
    }
  },
  data() {
    return {
      spinner: false
    }
  },

  methods: {
    ...mapMutations([
      'UPDATE_PRODUCT',
      'DELETE_PRODUCT',
      'SELECT_PRODUCT',
      'DISPLAY_RESPONSE',
    ]),

    destroy(product){
      this.spinner = true;
      this.$axios.delete(`/v1/products/${product.id}`).then(() => {
        this.DELETE_PRODUCT(product);
        this.DISPLAY_RESPONSE("Produto deletado com sucesso!");
      })
    },
  }
}
</script>