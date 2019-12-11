def getcodelocally():
    with open('./test.sc', 'r') as f:
        value= f.read()
    return value
        
     
def getcodeserver():
    # TODO: we can make the server return the code once it got there and check if thing went correctly
    return 0


if __name__ == "__main__":
    print("Checking if code that is inputted and that is in the server is same")
    print("Steps to reproduce:\nStart the local server on jamsession/backend/server\nAssign the onClick Handler to the Jam Button")
    codefromeditor=getcodelocally()
    codefromserver=getcodeserver()