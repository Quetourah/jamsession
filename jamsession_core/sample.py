import os, subprocess

shell = subprocess.Popen("ls -la".split(), stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE, shell=True)

def sample():
    global shell
    try:
        shell.kill()
        shell = "p"
    except Exception as e:
        raise
        # print("")

sample()
sample()