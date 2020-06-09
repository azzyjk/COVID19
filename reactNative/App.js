import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
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
      console.log(coordinate[0].newLon);
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
