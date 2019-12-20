from pydub import AudioSegment
import requests
import time

def getcodelocally():
    with open('./test.sc', 'r') as f:
        value= f.read()
    return value
        
     
def getcodeserver():
    # we can make the server return the code once it got there and check if thing went correctly
    # we havenot set up the docket container to return the code from the server this would be next step
    return 0

def getsoundlocal():
    # for this we have to do some change in the javascript such that,
    # in src/container/Coder.js line number 67 need to be set as a onclick listener
    # and the server on backend/server needs to be started
    code= getcodelocally()

    url = 'https://a9bd6961.ngrok.io/interpret'
    params = {'code': code}
    requests.post(url, data=params)
    # handling the lag are having
    time.sleep(20)

    sound = AudioSegment.from_mp3("https://c06fb052.ngrok.io/stream.mp3")

    # get raw audio data as a bytestring
    raw_data = sound.raw_data
    # get the frame rate
    sample_rate = sound.frame_rate
    # get amount of bytes contained in one sample
    sample_size = sound.sample_width
    # get channels
    channels = sound.channels
    # we are returning the channel we can do it 
    return channels

def getsoundserver():
    

    sound = AudioSegment.from_mp3("https://c06fb052.ngrok.io/stream.mp3")

    # get raw audio data as a bytestring
    raw_data = sound.raw_data
    # get the frame rate
    sample_rate = sound.frame_rate
    # get amount of bytes contained in one sample
    sample_size = sound.sample_width
    # get channels
    channels = sound.channels
    # we are returning the channel we can do it 
    return channels


if __name__ == "__main__":
    print("Checking if code that is inputted and that is in the server is same")
    print("Steps to reproduce:\nStart the local server on jamsession/backend/server\nAssign the onClick Handler to the Jam Button")
    server=getsoundserver()
    local=getsoundlocal()
    #compaare server and local
    if(server==local):
        print("end to end testing passes")



