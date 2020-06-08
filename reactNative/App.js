import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { TMAP_API } from "react-native-dotenv";

// `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?&version=1&fullAddr=서울 관악구 시흥대로 552 석천빌딩 8층&appKey=${TMAP_API}`

export default class App extends React.Component {
  getLocation = async () => {
    const { data } = await axios.get(`127.0.0.1:3000/location`);
    console.log(data);
  };
  componentDidMount() {
    this.getLocation();
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
