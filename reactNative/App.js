import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import axios from "axios";
import { TMAP_API } from "react-native-dotenv";
import * as Location from "expo-location";
import MapView, { Marker, Circle } from "react-native-maps";
import Map from "./Map";
import uuidv1 from "uuid/v1";

export default class App extends React.Component {
  state = {
    usrLat: 0,
    usrLon: 0,
    COVID: {},
  };
  componentDidMount() {
    this._getUserLocation();
    this._getCOVIDLocation();
  }
  render() {
    const { COVID, usrLat, usrLon } = this.state;
    return (
      <View style={styles.container}>
        <MapView
          style={styles.mapStyle}
          initialRegion={{
            latitude: 37.410717,
            longitude: 126.972513,
            latitudeDelta: 0.0052,
            longitudeDelta: 0.0061,
          }}
        >
          <Circle
            center={{
              latitude: usrLat,
              longitude: usrLon,
            }}
            radius={50}
            strokeWidth={2}
            strokeColor="#000DFF"
          />
          {Object.values(COVID).map((location) => (
            <Map key={location.id} {...location} />
          ))}
        </MapView>
      </View>
    );
  }
  _addCOVID = (address, longitude, latitude) => {
    this.setState((prevState) => {
      const ID = uuidv1();
      const newCOVIDObject = {
        [ID]: {
          id: ID,
          address: address,
          latitude: parseFloat(latitude),
          longitude: parseFloat(longitude),
        },
      };
      const newState = {
        ...prevState,
        COVID: {
          ...prevState.COVID,
          ...newCOVIDObject,
        },
      };
      return { ...newState };
    });
  };
  _noticeAlert() {
    Alert.alert("위험", "코로나 위험지역과 500m내에 있습니다.");
  }
  _getDistance = async (coLon, coLat) => {
    const { usrLon, usrLat } = this.state;
    try {
      const {
        data: {
          distanceInfo: { distance },
        },
      } = await axios.get(
        `https://apis.openapi.sk.com/tmap/routes/distance?version=1
        &startX=${usrLon}
        &startY=${usrLat}
        &endX=${coLon}
        &endY=${coLat}
        &appkey=${TMAP_API}`
      );
      console.log(distance);
      if (distance < 500) {
        this._noticeAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };
  _getCOIVDLonLat = async (address) => {
    try {
      const {
        data: {
          coordinateInfo: { coordinate },
        },
      } = await axios.get(
        `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?
         &version=1
         &fullAddr=${address}
         &appKey=${TMAP_API}`
      );
      this._getDistance(coordinate[0].newLon, coordinate[0].newLat);
      this._addCOVID(address, coordinate[0].newLon, coordinate[0].newLat);
    } catch (error) {
      console.log(error);
    }
  };
  _getCOVIDLocation = async () => {
    try {
      const {
        data: { loc },
      } = await axios.get(`http://192.168.0.14:3000/location`);
      loc.forEach((element) => {
        this._getCOIVDLonLat(element);
      });
    } catch (error) {
      console.log(error);
    }
  };
  _getUserLocation = async () => {
    await Location.requestPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    this._addCOVID("UserLocation", longitude, latitude);
    this.setState({
      usrLat: latitude,
      usrLon: longitude,
    });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
