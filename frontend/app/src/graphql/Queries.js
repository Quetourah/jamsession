import Amplify, { Analytics, Storage, API, graphqlOperation } from 'aws-amplify';

const listSongs = `query listSongs {
  listSongs {
    items {
      title
    }
  }
}`

export{listSongs};