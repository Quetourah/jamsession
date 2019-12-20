//Add your database information to retrieve data
export default {
    cognito: {
        REGION: REGION,
        USER_POOL_ID: USER_POOL_ID,
        APP_CLIENT_ID: APP_CLIENT_ID,
        IDENTITY_POOL_ID: IDENTITY_POOL_ID
    },
    graphql: {
        URL: URL,
        REGION: REGION,
        AUTHENTICATION_TYPE: AUTHENTICATION_TYPE
      },
    s3: {
        REGION: REGION,
        BUCKET: BUCKET
      }
};
