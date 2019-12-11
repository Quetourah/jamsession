# jamsession is 
- a multi user collaborative platform where you can live code music in a web browser in real time and further release it to the public
- an app for enthusiast musicians who want to learn music but are falling back due to lack of proper resources
- an app for lyricist, composer and producer where they can work collaboratively to produce a fine piece of music
- an app for anyone who loves music and are ready to kick off their musical journey online


### Local Development:
1. Clone repo
1. `cd app`
1. `yarn install`
1. `yarn start`

### Starting the Core Service:
1. See README.MD inside `jamsession_core`

### Jam Session Core:

#### High Level Description
This is a Docker container that hosts a basic Flask script that pipes the code of whatever the user has drafted on the frontend and send it to sclang/Supercollider to be interpreted and generate the sound. The sound generated in the container is being streamed to a socket. The socket can be played with an HTML5 media player. 

#### More details about the implementation:
After weeks of tweaking and messing around with running Supercollider and Foxdot headless, we have abandoned Foxdot integration even though it is the most popular live coding platform.
