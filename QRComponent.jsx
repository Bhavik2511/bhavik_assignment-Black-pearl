import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import QRCode from 'react-native-qrcode-svg';
import { request, PERMISSIONS } from 'react-native-permissions';

const QRComponent = () => {
  const [CameraPermission, setCameraPermission] = useState(null);
  const [scannedData, setScannedData] = useState(null);

  useEffect(() => {
    requestCameraPermission();
  }, []);

  const requestCameraPermission = async () => {
    const result = await request(PERMISSIONS.ANDROID.CAMERA);
    setCameraPermission(result === 'granted');
  };

  const onReadQRCode = (event) => {
    // Handle the scanned QR code data here
    const scannedData = event.data;
    console.log('Scanned QR Code:', scannedData);
    setScannedData(scannedData);
    Alert.alert('Scanned QR Code', scannedData);
  };

  if (CameraPermission === null) {
    return <View style={styles.container}><Text>Requesting Camera Permission</Text></View>;
  }

  if (CameraPermission === false) {
    return <View style={styles.container}><Text>No access to camera</Text></View>;
  }

  return (
    <View style={styles.container}>
      <QRCodeScanner
        onRead={onReadQRCode}
        showMarker
        reactivate
        reactivateTimeout={2000}
        markerStyle={styles.marker}
        containerStyle={styles.cameraContainer}
      />
      {scannedData && (
        <View style={styles.outputContainer}>
          <Text style={styles.outputText}>Scanned QR Code:</Text>
          <QRCode value={scannedData} size={150} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cameraContainer: {
    flex: 1,
    width: '100%',
  },
  marker: {
    borderColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
  },
  outputContainer: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  outputText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default QRComponent;