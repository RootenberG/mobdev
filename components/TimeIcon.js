import React from 'react';
import { StyleSheet, Image } from 'react-native';

function TimeIcon() {
    return (
        <>
            <Image style={styles.tIcon} source={require('../images/compas.png')} />
        </>
    )
}
const styles = StyleSheet.create({
  tIcon:{
      width:30,
      height:30
  }
});

export default TimeIcon
