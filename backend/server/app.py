from flask import Flask, request
from flask_cors import CORS
from flask_jsonpify import jsonify

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Index!"

@app.route("/hello", methods=['GET','POST'])
def hello():
    if request.method == 'POST':
        value = request.get_json().get('code')
        print(value)
        return jsonify({'code':value})

if __name__ == "__main__":
    app.run()