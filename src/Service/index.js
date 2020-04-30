const url = 'http://meuguiaapi-dev.us-east-2.elasticbeanstalk.com/api/';
export const app = {
  id: 7,
};

export const api = {
  categories: `${url}categories/`,
  stores: `${url}Stores/app/${app.id}/`,
  postStore: `${url}Stores`,
  neighborhoods: `${url}neighborhoods/app/${app.id}/`,
};

export default api;
