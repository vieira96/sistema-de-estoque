import Cookie from 'js-cookie'

const TOKEN_NAME = "stock_token";

export default {

    setToken(token) {
        Cookie.set(TOKEN_NAME, token, {expires: 30});
    },

    getToken() {
        return Cookie.get(TOKEN_NAME)
    },

    deleteToken() {
        return Cookie.remove(TOKEN_NAME)
    }
}