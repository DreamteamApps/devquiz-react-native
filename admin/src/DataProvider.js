import axios from 'axios';

export default (baseUrl) => {
    const token = localStorage.getItem('token');

    return {
        getList: (resource, params) => {
            const {page, perPage} = params.pagination;
            const { field, order} = params.sort;

            const url = `${baseUrl}/admin/${resource}?page=${page}&perPage=${perPage}&sortBy=${field}&sort=${order}`;
            const auth = { headers: { Authorization: `Bearer ${token}` } };
            
            return axios.get(url, auth).then(({ data }) => ({
                data: data.data,
                total: data.total,
            }));
        },

        getOne: (resource, params) => Promise.resolve(),

        getMany: (resource, params) => Promise.resolve(),

        getManyReference: (resource, params) => Promise.resolve(),

        update: (resource, params) => Promise.resolve(),

        updateMany: (resource, params) => Promise.resolve(),

        create: (resource, params) => {
            const url = `${baseUrl}/admin/${resource}`;
            const auth = { headers: { Authorization: `Bearer ${token}` } };

            return axios.post(url, params.data, auth).then(({ data }) => ({ data }));
        },

        delete: (resource, params) => Promise.resolve(),

        deleteMany: (resource, params) => Promise.resolve(),
    }
};