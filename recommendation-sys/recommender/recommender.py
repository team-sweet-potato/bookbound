# This file is for Content Based filtering, and uses the existing model that has been created,
# if model is to be updated add first part of code

# Install libraries and model
# Libraries
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import warnings
from sklearn.metrics.pairwise import cosine_distances, euclidean_distances
import json
warnings.filterwarnings('ignore')
# %matplotlib inline

import tensorflow as tf

# Initiate function to find similar books
def initiate_find(name):

  model = tf.keras.models.load_model('recommender/recommenderModel')

  # Importing csv data
  ratings_df = pd.read_csv("recommender/ratings.csv")
  books_df = pd.read_csv("recommender/books.csv")

  # Extract embeddings
  book_em = model.get_layer('embedding')
  book_em_weights = book_em.get_weights()[0]
  book_em_weights.shape

  # Content based filtering
  # Create Copy of books.csv
  books_df_copy = books_df.copy()
  # Setting index equal to the book_id
  books_df_copy = books_df_copy.set_index("book_id")
#   print(books_df_copy.head())
  index_book = {}
  book_index = {}
  index_isbn = {}
  b_id =list(ratings_df.book_id.unique())
  b_id.remove(10000)
  for id in b_id:
      # index_book[id] = books_df_copy.iloc[id]['original_title'] if books_df_copy.iloc[id]['original_title'] != '' or pd.isnull(books_df_copy.iloc[id]['original_title']) else 'title'
      index_book[id] = None if pd.isnull(books_df_copy.iloc[id]['original_title']) else books_df_copy.iloc[id]['original_title']
      index_isbn[id] = None if pd.isnull(books_df_copy.iloc[id]['isbn']) else books_df_copy.iloc[id]['isbn']
      book_index[index_book[id]] = id
  # Create weights for function to find similar books
  book_em_weightsExperiment = book_em_weights / np.linalg.norm(book_em_weights, axis = 1).reshape((-1, 1))
  book_em_weightsExperiment[0][:10]
  np.sum(np.square(book_em_weightsExperiment[0]))


  def find_similar(name, weights, n = 10):
      """Find n most similar items (or least) to name based on embeddings. Option to also plot the results"""

      # Select index and reverse index
      index = book_index
      rindex = index_book
      iindex = index_isbn

      # Check to make sure `name` is in index
      try:
          # Calculate dot product between book and all others
          dists = np.dot(weights, weights[index[name]])
      except KeyError:
          print(f'{name} Not Found.')
          return None

      # Sort distance indexes from smallest to largest
      sorted_dists = np.argsort(dists)

        # Take the last n sorted distances
      closest = sorted_dists[-n:]

      # Print the most similar and distances
      list = []
      for c in reversed(closest):
          obj = {"book":rindex[c], "isbn": iindex[c], "similarity": float(dists[c]) }
          list.append(obj)
      print("list of similar books", list)
      return list

  return find_similar(name, book_em_weightsExperiment)

  #  If we would like to include the vecs.tsv and meta.tsv files for a visual, add the code so that if csv data
  #  is updated in the future so is the tsv files.
