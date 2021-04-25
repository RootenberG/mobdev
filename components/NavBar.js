import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import  StudyIcon from "./StudyIcon";
import  GraphIcon from "./GraphIcon";


function NavBar(props) {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        onPress={() => props.changePage("home")}
        style={styles.touchable}
      >
        <View
          style={[
            styles.centeredText,
            props.onPage === "home" && styles.active,
          ]}
        >
          <StudyIcon />
          <Text style={styles.textFont}>General</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.changePage("graph")}
        style={styles.touchable}
      >
        <View
          style={[
            styles.centeredText,
            props.onPage === "graph" && styles.active,
          ]}
        >
          <GraphIcon />
          <Text style={styles.textFont}>Graph</Text>
        </View>
      </TouchableOpacity>
     
    </View>
  );
}
const styles = StyleSheet.create({
  navBar: {
    width: "100%",
    height: "100%",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  textFont: {
    fontSize: 13,
  },
  centeredText: {
    height: "100%",
    padding: 30,
    flex: 0.9,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  touchable: {
    flex: 0.5,
    height: "100%",
  },
  active: {
    borderRadius: 10,
    backgroundColor: "#313131",
  },
});

export default NavBar;
