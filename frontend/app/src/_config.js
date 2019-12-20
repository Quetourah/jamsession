//change this file's name from _config.js to config.js for app to work
//Add your database information to retrieve data
export default {
    cognito: {
        REGION: "",
        USER_POOL_ID:"",
        APP_CLIENT_ID:"",
        IDENTITY_POOL_ID: ""
    },
    graphql: {
        URL: "",
        REGION: "",
        AUTHENTICATION_TYPE: ""
      },
    s3: {
        REGION: "",
        BUCKET: ""
      }
};