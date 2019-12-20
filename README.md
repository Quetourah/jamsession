# Jam Session - [Live](https://jolly-ardinghelli-5a659c.netlify.com/)
 Jam Session a multi user collaborative platform where you can live code music in a web browser in real time. You can start live app by clicking [here](https://jolly-ardinghelli-5a659c.netlify.com/).



### Folder Structure:
```
frontend/app : contains all of our react files
backend/server: contains a Flask server for testing
images/wikis: assets for wikis
jamsession_core : files to start the core services using Docker

```

### Local Development:
- Clone repo into the local device
-  Get inside the folder you just created by cloning the repository by typing: <br />

    `cd jamsession`
- Inside you will find three main folders:
    - backend
    - frontend
    - jamsession_core
- Enter frontend/app folder by typing: <br />

    ```cd frontend/app```
- Update the `config.js` file in the src folder with your database information. We used Amazon Web Services (AWS) Cognito, AppSync, and DynamoDB.

- You need to install the node modules before running the app, enter the following command to install the modules:

    ``` npm install```
- In this folder type the following command to start the local development:<br/> 

    ```npm start```<br />

    Runs the app in the development mode.<br />
    Open [http://localhost:3000](http://localhost:3000) to view it in the browser.The page will reload if you make edits.You will also see any lint errors in the console.

- Type the following command to run the all tests:<br/>

    ```npm test```

    Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information. All the tests are located in src/tests


- Jamsession core is setup in a remote server, if you wan to run it locally follow this [README](https://github.com/Quetourah/jamsession/blob/master/jamsession_core/README.md)





### Jam Session Core:

#### High Level Description
This is a Docker container that hosts a basic Flask script that pipes the code of whatever the user has drafted on the frontend and send it to sclang/Supercollider to be interpreted and generate the sound. The sound generated in the container is being streamed to a socket. The socket can be played with an HTML5 media player. 

#### More details about the implementation:
After weeks of tweaking and messing around with running Supercollider and Foxdot headless, we have abandoned Foxdot integration even though it is the most popular live coding platform.
