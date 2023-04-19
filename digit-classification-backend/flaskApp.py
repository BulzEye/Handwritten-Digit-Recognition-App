import logging
from flask import Flask, request, make_response, jsonify
from flask_cors import CORS, cross_origin
from flask_ngrok import run_with_ngrok

import base64
app = Flask(__name__)
logging.basicConfig(level=logging.INFO)
logging.getLogger('flask_cors').level = logging.DEBUG
CORS(app)
# app.config['CORS_HEADERS'] = 'Content-Type' 
# run_with_ngrok(app)  

# def _build_cors_preflight_response():
#     response = make_response()
#     response.headers.add("Access-Control-Allow-Origin", "http://localhost:3000/")
#     response.headers.add('Access-Control-Allow-Headers', "Content-Type")
#     response.headers.add('Access-Control-Allow-Methods', "OPTIONS, POST")
#     return response

# def _corsify_actual_response(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     return response
  
@app.route("/")
def homeRoute():
    return "<h1>Hello World!</h1>"

@app.route("/getImage", methods=['POST'])
def getImageRoute():
    # if request.method == "OPTIONS": # CORS preflight
    #     return _build_cors_preflight_response()
#     if request.method == "POST":
#     print(request.json['image'])
    img_file = open('img.jpg', 'wb')
    img_file.write(base64.b64decode((request.json['image'][22:])))
    img_file.close()
    remove_background("img.jpg")
    convert_to_mnist_format("img.jpg")
    mnist_image = np.loadtxt('mnist_image.txt')
    #img = (mnist_image>0.1).astype(int)
    img = mnist_image.reshape(1,28,28)
    plt.imshow(img[0], cmap='gray')
    plt.show()
    prediction = pred_ensmbl(mnist_image)
#     predictions = ensemble_model.predict(mnist_image)
#     Print the predicted class
#     prediction = np.argmax(predictions)
    print('Predicted class:', prediction)
    return jsonify(prediction=int(prediction))
#         return _corsify_actual_response(jsonify({"field": "nice"}))
#     return _build_cors_preflight_response()
    
app.run()