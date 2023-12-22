import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, PermissionsAndroid } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation'

const MapComponent = ({navigation}) => {
  const [myLatitude, setmylatitude] = useState()
  const [myLongitude, setmyLongitude] = useState()

  useEffect(()=>{
    requestLocationPermission()
  },[])

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission',
          message:
            'Give Location Permission',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Location Permission Granted');
      } else {
        console.log('Location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
  const getlocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        // console.log(position);
        // console.log(position.coords.latitude)
        // console.log(position.coords.longitude)
        setmylatitude(position.coords.latitude)
        setmyLongitude(position.coords.longitude)
        Alert.alert( `Latitude: ${myLatitude}, Longitude: ${myLongitude}`);
      },
      (error) => {
        // See error code charts below.
        console.log(error.code, error.message);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
  );
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={
          {latitude: 25.17512000,
          longitude: 75.84412000,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,}
        }
      />
      <TouchableOpacity style={styles.button} onPress={getlocation}>
        <Text style={{ color: 'white', fontSize: 15 }}>Submit</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('QRComponent')}>
        <Text style={{ color: 'white', fontSize: 15 }}>Scan QR Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    backgroundColor: 'lightgrey',
  },
  map: {
    width: '90%',
    height: '80%',
  },
  button: {
    width: '80%',
    backgroundColor: '#6c5ce7',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
});

export default MapComponent;
