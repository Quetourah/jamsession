from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def index():
    return "Index!"

@app.route("/hello", methods=['GET','POST'])
def hello():
    value = request.get_json().get("data", None)
    print(value)
    return {"msg": value}

if __name__ == "__main__":
    app.run()