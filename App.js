import { StatusBar } from "expo-status-bar";
import React, {useState} from "react";
import { StyleSheet, Text, View } from "react-native";
import NavBar from "./components/NavBar";

export default function App() {
  const [showFirstPage,setShowFirstPage] = useState(true);
  const changePage = show => setShowFirstPage(show);
  return (
    <>
      {showFirstPage ?
          <View style={styles.container}>
            <Text style={styles.textInfo}>
              Савічев Денис{"\n"}Група ІВ-81{"\n"}ЗК ІВ-81 8123
            </Text>
            <StatusBar style="auto" />
          </View>
      :
        <View style={styles.container}>
          <Text>Page 2</Text>
        </View>
      }
      <View style={styles.navBar}>
            {/* <NavBar showFirstPage={showFirstPage} changePage={changePage}/> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "skyblue",
    flex: 0.92,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  navBar:{
    width:'100%',
    flex:0.08
  },
  textInfo: {
    textAlign: "center",
  },
});
