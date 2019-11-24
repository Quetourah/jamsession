# Write a flask app here that writes the source code to a file and triggers a script to evaluate SuperCollider
from flask import Flask, request, jsonify
from flask_cors import CORS
import subprocess

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
        with open('tmp_comm.py', 'w+') as f:
            f.truncate(0) # erase everything
            f.write("import FoxDot\n")
            f.write(value)
        
        res = subprocess.call("python tmp_comm.py", shell=True)

        print("RES: {}".format(res))
        return jsonify({'code':value})

if __name__ == "__main__":
    app.run()