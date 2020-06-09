import React, { Component } from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import axios from "axios";
import { TMAP_API } from "react-native-dotenv";
import * as Location from "expo-location";

export default class App extends React.Component {
  state = {
    usrLat: "",
    usrLon: "",
    COVID: [],
  };
  componentDidMount() {
    this._getUserLocation();
    this._getCOVIDLocation();
  }
  render() {
    const { COVID } = this.state;
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
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
      this.setState({
        COVID: loc,
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
});
