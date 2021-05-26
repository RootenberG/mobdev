import React from "react";
import { StyleSheet, Image } from 'react-native';

function PhotosIcon() {
  return (
    <>
      <Image style={styles.stdIcon} source={require('../../images/photos.png')} />
    </>
  );
}
const styles = StyleSheet.create({
  stdIcon:{
      width:40,
      height:40
  }
});

export default PhotosIcon;
