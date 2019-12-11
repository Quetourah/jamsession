
import pydub
from io import BytesIO
import urllib.request

def getcodelocally():
    with open('./test.sc', 'r') as f:
        value= f.read()
    return value
        
     
def getcodeserver():
    # TODO: we can make the server return the code once it got there and check if thing went correctly
    return 0

def getsoundlocal():
    pass
def getsoundserver():
    req = urllib.request.Request("https://5d81cc20.ngrok.io/stream.mp3")
    response = urllib.request.urlopen(req)
    data = response.read()

    sound = pydub.AudioSegment.from_mp3(BytesIO(data))

    # get raw audio data as a bytestring
    raw_data = sound.raw_data
    # get the frame rate
    sample_rate = sound.frame_rate
    # get amount of bytes contained in one sample
    sample_size = sound.sample_width
    # get channels
    channels = sound.channels
    return raw_data


if __name__ == "__main__":
    print("Checking if code that is inputted and that is in the server is same")
    print("Steps to reproduce:\nStart the local server on jamsession/backend/server\nAssign the onClick Handler to the Jam Button")
    codefromeditor=getcodelocally()
    codefromserver=getcodeserver()
    



