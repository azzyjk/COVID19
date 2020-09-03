import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import PropTypes from "prop-types";
import Point from "./Point";

export default class Map extends React.Component {
  static propTypes = {
    usrLat: PropTypes.number.isRequired,
    usrLon: PropTypes.number.isRequired,
  };
  render() {
    const { usrLat, usrLon, COVID } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.container}>
          <MapView
            style={styles.mapStyle}
            initialRegion={{
              latitude: usrLat,
              longitude: usrLon,
              latitudeDelta: 0.0072,
              longitudeDelta: 0.0121,
            }}
          >
            <Circle
              center={{
                latitude: usrLat,
                longitude: usrLon,
              }}
              radius={500}
              strokeWidth={2}
              strokeColor="#000DFF"
            />
            {Object.values(COVID).map((location) => (
              <Point key={location.id} {...location} />
            ))}
          </MapView>
        </View>
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
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
