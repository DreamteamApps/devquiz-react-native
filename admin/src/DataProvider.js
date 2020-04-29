import axios from 'axios';

export default (baseUrl) => {
    return {
        getList: (resource, params) => {
            const url = `${baseUrl}/${resource}`;
    
            return axios.get(url).then(({ data }) => ({
                data: data,
                total: 10,
            }));
        },
    
        getOne: (resource, params) => Promise.resolve(),
    
        getMany: (resource, params) => Promise.resolve(),
    
        getManyReference:(resource, params) => Promise.resolve(),
    
        update: (resource, params) => Promise.resolve(),
    
        updateMany: (resource, params) => Promise.resolve(),
    
        create: (resource, params) => {
            const url = `${baseUrl}/${resource}`;
    
            return axios.post(url, params.data).then(({ data }) => ({data}));
        },
    
        delete: (resource, params) => Promise.resolve(),
    
        deleteMany: (resource, params) => Promise.resolve(),
    }
};