# Write a flask app here that writes the source code to a file and triggers a script to evaluate SuperCollider
from flask import Flask, request, jsonify
from flask_cors import CORS
<<<<<<< HEAD
import subprocess
=======
import subprocess, os, signal, prctl
>>>>>>> changes

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Index!"

@app.route("/interpret", methods=['POST'])
def hello():
    if request.method == 'POST':
        value = request.values['code']
        if value is None:
            return jsonify({"msg": "Need the `code` present"}), 400
        with open('/tmp_comm.sc', 'w+') as f:
            f.truncate(0) # erase everything
            # f.write("import FoxDot\n")
            f.write(value)
        
        
<<<<<<< HEAD
        res = subprocess.call("xvfb-run -a sclang /tmp_comm.sc", shell=True)
=======
        res = subprocess.Popen("xvfb-run -a sclang /tmp_comm.sc", stdout=subprocess.PIPE, shell=True, preexec_fn=lambda: prctl.set_pdeathsig(signal.SIGKILL))
>>>>>>> changes

        print("RES: {}".format(res))
        return jsonify({'code':value}), 200

if __name__ == "__main__":
<<<<<<< HEAD
    app.run()
=======
    app.run(host='0.0.0.0', debug=True)
>>>>>>> changes
