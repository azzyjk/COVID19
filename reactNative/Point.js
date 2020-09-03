import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import PropTypes from "prop-types";

export default class Point extends React.Component {
  static propTypes = {
    longitude: PropTypes.number.isRequired,
    latitude: PropTypes.number.isRequired,
  };
  render() {
    const { id, date, name, address, latitude, longitude } = this.props;
    return (
      <Marker
        coordinate={{
          latitude: latitude,
          longitude: longitude,
        }}
        title={name + date}
        description={address}
      ></Marker>
    );
  }
}
