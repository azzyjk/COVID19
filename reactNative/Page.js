import React, { Component } from "react";
import { StyleSheet, Text, View, Alert, Dimensions } from "react-native";
import MapView, { Marker, Circle } from "react-native-maps";
import PropTypes from "prop-types";

export default class Page extends React.Component {
  static navigationOptions = ({ navigation }) => {
    return { headerTitle: "마이페이지" };
  };
  render() {
    return (
      <View style={styles.container}>
        <Text>MyPage</Text>
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
