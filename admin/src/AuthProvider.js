import axios from 'axios';

export default (baseUrl) => {
    return {
        login: async (params) => {
            const url = `${baseUrl}/admin/auth/token`;

            const { username, password } = params;

            try {
                const loginResponse = await axios.post(url, { email: username, password });
                
                localStorage.setItem('token', loginResponse.data.token);
                localStorage.setItem('user', JSON.stringify(loginResponse.data.user));

            } catch (error) {
                if (error && error.response && error.response.data.message) {
                    throw error.response.data.message;
                }
                throw "An error has occured!";
            }
        },
        logout: async () => {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        },
        checkAuth: async () => { 
            const token = localStorage.getItem('token');
            if(!token) {
                throw "";
            }
        },
        checkError: error => Promise.resolve(),
        getPermissions: params => Promise.resolve(),
    }
};