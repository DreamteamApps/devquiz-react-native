export default (baseUrl) => {
    return {
        login: (params) => {
            console.log(params);
        },
        logout: params => Promise.resolve(),
        checkAuth: () => (localStorage.getItem('token') ? Promise.resolve() : Promise.reject()),
        checkError: error => Promise.resolve(),
        getPermissions: params => Promise.resolve(),
    }
};