import React from 'react';
import { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import * as Location from 'expo-location'

import { Feather, EvilIcons } from '@expo/vector-icons'

import MainCard from './components/MainCard'
import InfoCard from './components/InfoCard'

import getCurrentWeather from './api/ConsultAPI'

export default function App() {
  const [darkTheme, setDarkTheme] = useState(true)
  const [currentTemperature, setCurrentTemperature] = useState('27')
  const [location, setLocation] = useState('BR, Fortaleza')
  const [currentHour, setCurrentHour] = useState('13:00')

  const [wind, setWind] = useState('60')
  const [umidity, setHumidity] = useState('80')
  const [tempMin, setTempMin] = useState('21')
  const [tempMax, setTempMax] = useState('31')

  const [locationCoords, setLocationCoords] = useState([])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      alignItems: 'center',
    },
    temperature: {
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: 10
    },
    temperatureText: {
      fontSize: 40,
      color: darkTheme ? '#e0e0e0' : 'black'
    },
    refreshButton: {
      position: 'absolute',
      marginTop: 60,
      marginLeft: 25,
      alignSelf: 'flex-start'
    },
    cardView: {
      color: darkTheme ? 'black' : 'white',
      margin: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    info: {
      alignItems: 'center',
      backgroundColor: darkTheme ? '#393e54' : '#8f8f8f',
      borderRadius: 10,
      width: 350,
      height: 230
    },
    infoText: {
      color: darkTheme ? '#e0e0e0' : 'white',
      fontSize: 20,
      fontWeight: 'bold',
      margin: 15
    },
    cardInfo: {
      flexDirection: 'row',
      flexWrap: 'wrap'
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
      borderRadius: 25
    },
    square: {
      backgroundColor: darkTheme ? '#f2f2f2' : '#8f8f8f',
      justifyContent: 'center',
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25
    },
    circleButton: {
      alignSelf: darkTheme ? 'flex-end' : 'flex-start',
      backgroundColor: darkTheme ? '#232634' : '#f2f2f2',
      margin: 5,
      width: 20, 
      height: 20,
      borderRadius: 10
    }
  });

  async function setCurrentWeather() {
    await getLocation(locationCoords)

    let date = new Date()

    setCurrentHour(date.getHours() + ':' + date.getMinutes())

    const data = await getCurrentWeather(locationCoords)

    setCurrentTemperature(convertKelvin(data[0]).toFixed(2))
    setTempMin(convertKelvin(data[1]).toFixed(2))
    setTempMax(convertKelvin(data[2]).toFixed(2))
    setLocation(data[3])
    setWind(data[4])
    setHumidity(data[5])
  }

  function convertKelvin(kelvin) {
    return(kelvin - 273)
  }

  async function getLocation() {
    let { status } = await Location.requestPermissionsAsync()

    if(status !== 'granted') {
      setErrorMsg('Sem permissão')
    } else {
      let location = await Location.getCurrentPositionAsync({})
      await setLocationCoords(location.coords)
      console.log(location)
    }
  }

  useEffect(() => {
    setCurrentWeather()
  }, [])

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setCurrentWeather()} style={styles.refreshButton}>
        <EvilIcons name="refresh" size={30} color={darkTheme ? 'white' : 'black'} />
      </TouchableOpacity>

      <Feather name="sun" style={{marginTop: 55}} size={24} color="orange" />

      <View style={styles.temperature}>
        <Text style={styles.temperatureText}>{currentTemperature}</Text>
        <Text style={[styles.temperatureText, {fontSize: 15}]}> °C</Text>
      </View>

      <Text style={[styles.temperatureText, {fontSize: 14}]}>{location}, {currentHour}</Text>

      <View style={styles.cardView}>
        <MainCard title={'Manhã'} backgroundColor={ darkTheme ? '#ff873d' : '#cc6e30'} temperature={'21°'} icon={'morning'} />
        <MainCard title={'Tarde'} backgroundColor={ darkTheme ? '#d29600' : '#fcc63f'} temperature={'31°'} icon={'afternoon'} />
        <MainCard title={'Noite'} backgroundColor={ darkTheme ? '#008081' : '#38b7b8'} temperature={'20°'} icon={'night'} />
      </View>

      <View style={styles.info}>
        <Text style={styles.infoText}>Informações adicionais:</Text>
          <View style={styles.cardInfo}>
            <InfoCard title={'Vento'} value={wind + ' m/h'} />
            <InfoCard title={'Umidade'} value={umidity + '%'} />
            <InfoCard title={'Temp. Min'} value={tempMin + '°C'} />
            <InfoCard title={'Temp. Max'} value={tempMax + '°C'} />
          </View>
      </View>

      <View style={styles.themeButton}>
        <View style={styles.square}>
          <TouchableOpacity style={styles.circleButton} onPress={() => darkTheme ? setDarkTheme(false) : setDarkTheme(true)}>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}


