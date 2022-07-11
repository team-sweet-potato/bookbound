import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from 'react-native';
import axios from 'axios';
import { api_key } from '../apikey';
import { BarCodeScanner } from 'expo-barcode-scanner';

const Scanner = ({ navigation }) => {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = async ({ data }) => {
    setScanned(true);
    const book = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=isbn=${data}&key=${api_key}`)
    const bookData = book.data;
    navigation.navigate("Single Book", {
      book: bookData.items[0].volumeInfo
    })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
});

export default Scanner;
