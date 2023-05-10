export const host = 'http://localhost:3000';
export const environment = {
  production: true,
  chooseNameUrl: {
    get: host + '/chooseName',
  },
  listAuthorsUrl: {
    get: host + '/listAuthors' ,
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
