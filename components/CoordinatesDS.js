import React from "react";
import { StyleSheet, Text, View } from "react-native";

class Direction {
  N = "N";
  W = "W";
  E = "E";
  S = "S";

  constructor(curr, dest, deg) {
    this.deg = deg;
    this.curr = curr;
    this.dest = dest;
  }
  getDir() {
    return this.deg < 0 ? (this.curr[0] ? "W" : "S") : this.curr[0] ? "E" : "N"; //curr[0] - lng
  }

  // toString() {
  //   return
  // }
}

export default class CoordinateDS extends React.Component {
  constructor(props) {
    super(props),
      (this.state = {
        deg: props.deg ? props.deg : 0,
        sec: props.sec ? props.sec : 0,
        min: props.min ? props.min : 0,
      });

    this.direction = new Direction([1, 2], [1, 2], props.deg ? props.deg : 0);
  }

  setState(data) {
    this.state = {
      ...this.state,
      ...data,
    };
  }


  checkValidationCoords(date) {
    const ruleDEG = date.deg >= -90 && date.deg <= 90;
    const ruleMIN = date.min >= 0 && date.min <= 59;
    const ruleSEC = date.sec >= 0 && date.sec <= 59;
    return ruleDEG && ruleMIN && ruleSEC;
  }

  setCustomCoords(data) {
    if (this.checkValidationCoords(data)) {
      this.setState({
        deg: data.deg,
        sec: data.sec,
        min: data.min,
      });
      return <>{this.getCoords()}</>;
    } else {
      return <>Введіть правильні значення координат!</>;
    }
  }

  getCoords() {
    return `${this.state.deg}°${this.state.sec}′${
      this.state.min
    }″ ${this.direction.getDir()}”`;
  }
  getIntCoords() {
    return `${
      this.state.deg + this.state.min / 60 + this.state.sec / 3600
    } ${this.direction.getDir()}`;
  }
  getBetweenCoords(props) {
    props.deg = (this.state.deg + props.deg) / 2;
    props.min = (this.state.min + props.min) / 2;
    props.sec = (this.state.sec + props.sec) / 2;

    const new_coord = new CoordinateDS(props);
    const cond = new_coord.direction.getDir() == this.direction.getDir();

    return cond ? new_coord : null;
  }
  static getBetweenCoordsSecond(props){
    props.deg = (props.second.deg + props.first.deg) / 2;
    props.min = (props.second.min + props.first.min) / 2;
    props.sec = (props.second.sec + props.first.sec) / 2;

    const new_coord = new CoordinateDS(props);
    const first_coord = new CoordinateDS(props.first);
    const sec_coord = new CoordinateDS(props.second);

    const cond = first_coord.direction.getDir() == sec_coord.direction.getDir();

    return cond ? new_coord : null;

  }


  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textInfo}>
          Coords:
          {this.getCoords()}
          {"\n"}
          Int coords:
          {this.getIntCoords()}
        </Text>
        <Text style={styles.textInfo}>
          Встановимо нове значення:{"\n"}
          {this.setCustomCoords({ deg: 32, min: 41, sec: 4 })}
          {"\n"}
          {this.getIntCoords()}
        </Text>
        <Text style={styles.textInfo}>
          New CoordinateDS{"\n"}
          {this.getBetweenCoords({ deg: 42, min: 32, sec: 32 }).getCoords()}
        </Text>
        <Text style={styles.textInfo}>
          Sec CoordinateDS{"\n"}
          {CoordinateDS.getBetweenCoordsSecond({"first":{ deg: 42, min: 32, sec: 32 },"second":{deg: 2, min: 2, sec: 2 }}).getCoords()}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "skyblue",
    flex: 0.92,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navBar: {
    width: "100%",
    flex: 0.08,
  },
  textInfo: {
    textAlign: "center",
  },
});
