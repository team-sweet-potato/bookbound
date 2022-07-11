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

warnings.filterwarnings('ignore')
# %matplotlib inline

import tensorflow as tf

# Model

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

  index_book = {}
  book_index = {}
  b_id =list(ratings_df.book_id.unique())
  b_id.remove(10000)
  for i in b_id:
      index_book[i] = books_df_copy.iloc[i]['title']
      book_index[index_book[i]] = i;

  # Create weights for function to find similar books
  book_em_weightsExperiment = book_em_weights / np.linalg.norm(book_em_weights, axis = 1).reshape((-1, 1))
  book_em_weightsExperiment[0][:10]
  np.sum(np.square(book_em_weightsExperiment[0]))

  def find_similar(name, weights, index_name = 'book', n = 10, least = False, return_dist = False, plot = False):
      """Find n most similar items (or least) to name based on embeddings. Option to also plot the results"""

      # Select index and reverse index
      if index_name == 'book':
          index = book_index
          rindex = index_book
      elif index_name == 'page':
          index = link_index
          rindex = index_link

      # Check to make sure `name` is in index
      try:
          # Calculate dot product between book and all others
          dists = np.dot(weights, weights[index[name]])
      except KeyError:
          print(f'{name} Not Found.')
          return None

      # Sort distance indexes from smallest to largest
      sorted_dists = np.argsort(dists)

      # Plot results if specified
      if plot:

          # Find furthest and closest items
          furthest = sorted_dists[:(n // 2)]
          closest = sorted_dists[-n-1: len(dists) - 1]
          items = [rindex[c] for c in furthest]
          items.extend(rindex[c] for c in closest)

          # Find furthest and closets distances
          distances = [dists[c] for c in furthest]
          distances.extend(dists[c] for c in closest)

          colors = ['r' for _ in range(n //2)]
          colors.extend('g' for _ in range(n))

          data = pd.DataFrame({'distance': distances}, index = items)

          # Horizontal bar chart
          data['distance'].plot.barh(color = colors, figsize = (10, 8),
                                    edgecolor = 'k', linewidth = 2)
          plt.xlabel('Cosine Similarity');
          plt.axvline(x = 0, color = 'k');

          # Formatting for italicized title
          name_str = f'{index_name.capitalize()}s Most and Least Similar to'
          for word in name.split():
              # Title uses latex for italize
              name_str += ' $\it{' + word + '}$'
          plt.title(name_str, x = 0.2, size = 28, y = 1.05)

          return None

      # If specified, find the least similar
      if least:
          # Take the first n from sorted distances
          closest = sorted_dists[:n]

          print(f'{index_name.capitalize()}s furthest from {name}.\n')

      # Otherwise find the most similar
      else:
          # Take the last n sorted distances
          closest = sorted_dists[-n:]

          # Need distances later on
          if return_dist:
              return dists, closest


          print(f'{index_name.capitalize()}s closest to {name}.\n')

      # Need distances later on
      if return_dist:
          return dists, closest


      # Print formatting
      max_width = max([len(rindex[c]) for c in closest])

      # Print the most similar and distances
      for c in reversed(closest):
          print(f'{index_name.capitalize()}: {rindex[c]:{max_width + 2}} Similarity: {dists[c]:.{2}}')

  find_similar(name, book_em_weightsExperiment)

  #  If we would like to include the vecs.tsv and meta.tsv files for a visual, add the code so that if csv data
  #  is updated in the future so is the tsv files.
