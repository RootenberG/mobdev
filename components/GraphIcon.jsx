import React from "react";
import { StyleSheet, Image } from 'react-native';

function GraphIcon() {
  return (
    <>
      <Image style={styles.stdIcon} source={require('../images/graph.png')} />
    </>
  );
}
const styles = StyleSheet.create({
  stdIcon:{
      width:40,
      height:40
  }
});

export default GraphIcon;
