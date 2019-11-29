# Write a flask app here that writes the source code to a file and triggers a script to evaluate SuperCollider
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess, os, signal, prctl

app = Flask(__name__)
CORS(app)

shell = subprocess.Popen("xvfb-run -a sclang /radio.sc".split(), stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)

@app.route("/")
def index():
    return "Index!"

def kill_shell():
    try:
        shell.kill()
        return True
    except:
        return False

@app.route("/interpret", methods=['POST'])
def hello():
    if request.method == 'POST':
        value = request.values['code']
        if value is None:
            return jsonify({"msg": "Need the `code` present"}), 400
        with open('/tmp_comm.sc', 'w+') as f:
            f.truncate(0) # erase everything
            f.write(value)
        
        with open('/tmp_comm.sc', 'r') as f:
            print(f.read())
        
        shell = subprocess.Popen("xvfb-run -a sclang /tmp_comm.sc".split(), stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return "OK", 200

@app.route("/demo", methods=['POST'])
def demo():
    if request.method == 'POST':
        shell = subprocess.Popen("xvfb-run -a sclang /radio.sc".split(), stdin=subprocess.PIPE,
                         stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        return "OK"

@app.route("/kill", methods=['POST'])
def demo():
    if request.method == 'POST':
        if kill_shell():
            return "Killed sclang instance"
        return "Error killing sclang instance"

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
