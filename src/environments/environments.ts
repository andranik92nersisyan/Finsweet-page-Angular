export const host = 'http://localhost:3000';
export const environment = {
  production: false,
  chooseNameUrl: {
    get: host + '/chooseName',
  },
  listAuthorsUrl: {
    get: host + '/listAuthors',
  },
  blogPostUrl: {
    get: host + '/blogPost',
  },
  featPostUrl: {
    get: host + '/featPost',
  },
  joinNewUrl: {
    get: host + '/joinNew',
  }
};
