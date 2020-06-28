import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Alert,
  Dimensions,
  Button,
} from "react-native";
import { createStackNavigator, createAppContainer } from "react-navigation";
import axios from "axios";
import { TMAP_API, API_URL } from "react-native-dotenv";
import * as Location from "expo-location";
import MapView, { Marker, Circle } from "react-native-maps";
import Map from "./Map";
import uuidv1 from "uuid/v1";
import Page from "./Page";

export default class App extends React.Component {
  state = {
    usrLat: 0,
    usrLon: 0,
    COVID: {},
    isLoading: false,
  };
  componentDidMount() {
    this._getUserLocation();
    // this._getCOVIDLocation();
  }
  render() {
    const { COVID, usrLat, usrLon, isLoading } = this.state;
    const onPressItem = () => {
      this.props.navigation.navigate("Page");
    };
    if (isLoading === false) {
      return (
        <View style={styles.container}>
          <Text> Loading... </Text>
        </View>
      );
    } else {
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
                <Map key={location.id} {...location} />
              ))}
            </MapView>
          </View>
          <View style={styles.container}>
            <Button onPress={onPressItem} title="Move" corlor="#000" />
          </View>
        </View>
      );
    }
  }
  _addCOVID = (element, longitude, latitude) => {
    this.setState((prevState) => {
      const ID = uuidv1();
      const newCOVIDObject = {
        [ID]: {
          id: ID,
          name: element.name,
          address: element.address,
          date: element.date,
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
      if (distance < 500) {
        this._noticeAlert();
      }
    } catch (error) {
      console.log(error);
    }
  };
  _getCOIVDLonLat = async (element) => {
    try {
      const {
        data: {
          coordinateInfo: { coordinate },
        },
      } = await axios.get(
        `https://apis.openapi.sk.com/tmap/geo/fullAddrGeo?
         &version=1
         &fullAddr=${element.address}
         &appKey=${TMAP_API}`
      );
      this._getDistance(coordinate[0].newLon, coordinate[0].newLat);
      this._addCOVID(element, coordinate[0].newLon, coordinate[0].newLat);
    } catch (error) {
      console.log(error);
    }
  };
  _getCOVIDLocation = async () => {
    try {
      const { data } = await axios.get(API_URL);
      data.forEach((element) => {
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
    const userInfo = {
      name: "현재위치",
      address: "",
      date: "",
    };
    this._addCOVID(userInfo, longitude, latitude);
    this.setState({
      usrLat: latitude,
      usrLon: longitude,
      isLoading: true,
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
