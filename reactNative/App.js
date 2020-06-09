import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { TMAP_API } from "react-native-dotenv";
import * as Location from "expo-location";

//`https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?&version=1&fullAddr=서울 관악구 시흥대로 552 석천빌딩 8층&appKey=${TMAP_API}`

export default class App extends React.Component {
  getDistance = async () => {
    try {
      const { data } = await axios.get(
        `https://apis.openapi.sk.com/tmap/routes/distance?version=1
        &startX=126.9912
        &startY=37.3631
        &endX=126.901416
        &endY=37.482121
        &appkey=${TMAP_API}`
      );
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  getCOVIDLocation = async () => {
    try {
      const {
        data: { loc },
      } = await axios.get(`http://192.168.0.14:3000/location`);
      console.log(loc);
    } catch (error) {
      console.log(error);
    }
  };
  getUserLocation = async () => {
    await Location.requestPermissionsAsync();
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync();
    console.log(latitude, longitude);
  };
  componentDidMount() {
    this.getUserLocation();
    this.getCOVIDLocation();
    this.getDistance();
  }
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
