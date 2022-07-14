#  Run the below command to instal dotenv
#  pip install -U python-dotenv

# Libraries to install
from flask import Flask
from flask_restful import Api, Resource
# from dotenv import load_dotenv
# load_dotenv()
import os
import json

from recommender.recommender import initiate_find

app = Flask(__name__)
api = Api(app)

# Route for Book Recommendations
class Recommendation(Resource):
  def get(self, book):
    result = initiate_find(book)
    return json.dumps(result)

api.add_resource(Recommendation, "/<string:book>")

if __name__ == "__main__":
  app.run(host="localhost", port=8000, debug=True)

