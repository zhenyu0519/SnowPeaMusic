const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLBoolean,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLSchema,
} = require('graphql');


const SmpfPlaylistType = new GraphQLObjectType({
  name: 'SimplifyPlaylist',
  fields: () => ({
    message: { type: GraphQLString },
    playlists: { type: playlistType },
  }),
});

const playlistType = new GraphQLObjectType({
  name: 'Playlists',
  fields: () => ({
    href: { type: GraphQLString },
    items: { type: new GraphQLList(itemType) },
  }),
});

const itemType = new GraphQLObjectType({
  name: 'Item',
  fields: () => ({
    collaborative: { type: GraphQLBoolean },
    description: { type: GraphQLString },
    name: { type: GraphQLString },
    external_urls: {
      type: new GraphQLObjectType({
        name: 'external_urls',
        fields: () => ({
          spotify: { type: GraphQLString },
        }),
      }),
    },
    id: { type: GraphQLString },
    href: { type: GraphQLString },
    name: { type: GraphQLString },
    images: { type: new GraphQLList(imageType) },
    snapshot_id: { type: GraphQLString },
    type: { type: GraphQLString },
    tracks: {
      type: new GraphQLObjectType({
        name: 'Track',
        fields: () => ({
          href: { type: GraphQLString },
          total: { type: GraphQLInt },
        }),
      }),
    },
  }),
});

const imageType = new GraphQLObjectType({
  name: 'Image',
  fields: () => ({
    height: { type: GraphQLInt },
    width: { type: GraphQLInt },
    url: { type: GraphQLString },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    SmpfPlaylist: {
      type: SmpfPlaylistType,
      resolve(parent, args, context) {
        return axios({
          method: 'get',
          url: '/featured-playlists',
          baseURL: 'https://api.spotify.com/v1/browse',
          params: {
            country: 'CA',
            locale: 'zh',
          },
          headers: {
            Authorization: 'Bearer ' + context.cookies.access_token,
          },
        }).then(res => res.data);
      },
    },
  },
});

//axios interceptors to log request
axios.interceptors.request.use(
  config => {
    // Do something before request is sent
    console.log(`${config.method.toUpperCase()} request send to ${config.url}`);
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  },
);

module.exports = new GraphQLSchema({
  query: RootQuery,
});
