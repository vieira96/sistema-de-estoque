<template>
    <table>
        <tr>
            <th>Nome</th>
            <th>Preço</th>
            <th>Estoque</th>
            <th>Cadastrado em</th>
            <th>Ações</th>
        </tr>
        <TableItem v-for="product in products" :key="product.id" :product="product" />
    </table>
</template>

<script>
import { createNamespacedHelpers } from 'vuex';
const { mapState } = createNamespacedHelpers('product');

import TableItem from '@/components/TableItem';

export default {
    components: {
        TableItem
    },
    computed: {
        ...mapState({
            products: state => state.products
        })
    },
}
</script>

<style>
    table {
    font-family: arial, sans-serif;
    border-collapse: collapse;
    width: 100%;
    }

    th {
        color: #eee;
    }

    td, th {
    border: 1px solid rgba(214, 209, 209, 0.2);
    text-align: left;
    padding: 8px;
    }

    tr:nth-child(even) {
    background-color: #dddddd;
    }

    tr:nth-child(odd) {
    color: #ccc;
    }
</style>