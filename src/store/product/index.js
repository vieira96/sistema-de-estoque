export default {
    namespaced: true,

    state: () => ({
        products: [],
        selectedProduct: {},
        response: {
            message: ''
        }
    }),

    mutations: {
        LIST_PRODUCTS(state, products) {
            state.products = products
        },

        CREATE_PRODUCT(state, product) {
            state.products.unshift(product)
        },

        UPDATE_PRODUCT(state, product) {
            const index = state.products.findIndex(p => p.id === product.id);
            state.products.splice(index, 1, product);
        },

        DELETE_PRODUCT(state, product) {
            const index = state.products.findIndex(p => p.id === product.id);
            state.products.splice(index, 1);
        },

        SELECT_PRODUCT(state, product) {
            state.selectedProduct = product;
        },

        DISPLAY_RESPONSE(state, message) {
            state.response.message = message
            setInterval(() => {
                state.response.message = '';
            }, 2000)
        }
    },

}