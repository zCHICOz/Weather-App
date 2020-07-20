import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Feather, Fontisto } from '@expo/vector-icons'

const MainCard = (props) => {

  const Icon = () => {
    if(props.icon === 'morning') {
      return (
        <Fontisto name="day-cloudy" style={styles.cardIcon} size={35} color="orange" />
      )
    }

    if(props.icon === 'afternoon') {
      return (
        <Feather name="sun" style={styles.cardIcon} size={35} color="orange" />
      )
    }

    if(props.icon === 'night') {
      return (
        <Feather name="cloud-rain" style={styles.cardIcon} size={35} color="orange" />
      )
    }
  }

  const styles = StyleSheet.create({
    card: {
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: props.backgroundColor,
      margin: 10,
      width: 110,
      height: 210,
      borderRadius: 10
    },
    text: {
      color: 'white',
      margin: 15,
      fontSize: 20
    },
    cardIcon: {
      color: 'white',
      margin: 15
    },
    temperatureText: {
      color: 'white'
    }
  });

  return(
    <View style={styles.card}>
      <Text style={[styles.text, { fontWeight: 'bold'}]}>{props.title}</Text>
      <Icon />
      <Text style={styles.text}>{props.temperature}</Text>
    </View>
  )
}

export default MainCard