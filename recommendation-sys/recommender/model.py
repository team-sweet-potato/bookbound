import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import os
import warnings
from sklearn.metrics.pairwise import cosine_distances, euclidean_distances

warnings.filterwarnings('ignore')
# %matplotlib inline

import tensorflow as tf

ratings_df = pd.read_csv("ratings.csv")
books_df = pd.read_csv("books.csv")
ratings_df.head()

from sklearn.model_selection import train_test_split
Xtrain, Xtest = train_test_split(ratings_df, test_size=0.3, random_state=1)

#Get the number of unique entities in books and users columns
nbook_id = ratings_df.book_id.nunique()
nuser_id = ratings_df.user_id.nunique()

#Book input network
input_books = tf.keras.layers.Input(shape=[1])
embed_books = tf.keras.layers.Embedding(nbook_id + 1,15)(input_books)
books_out = tf.keras.layers.Flatten()(embed_books)

#user input network
input_users = tf.keras.layers.Input(shape=[1])
embed_users = tf.keras.layers.Embedding(nuser_id + 1,15)(input_users)
users_out = tf.keras.layers.Flatten()(embed_users)

conc_layer = tf.keras.layers.Concatenate()([books_out, users_out])
x = tf.keras.layers.Dense(128, activation='relu')(conc_layer)
x_out = x = tf.keras.layers.Dense(1, activation='relu')(x)
model = tf.keras.Model([input_books, input_users], x_out)

opt = tf.keras.optimizers.Adam(learning_rate=0.001)
model.compile(optimizer=opt, loss='mean_squared_error')

hist = model.fit([Xtrain.book_id, Xtrain.user_id], Xtrain.rating,
  batch_size=64,
  epochs=5,
  verbose=1,
  validation_data=([Xtest.book_id, Xtest.user_id], Xtest.rating))

# save the model
model.save('recommenderModel')
