import React, {useEffect, useState} from 'react';
import {StyleSheet, Image, View, Text} from 'react-native';
import MapView, {Marker, Callout} from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from "expo-location";


function Main({ navigation }) {
    const [currentRegion, setCurrentRegion] = useState(null);

    useEffect(()=>{
        async function loadInitialLocation() {
            const {granted} = await requestPermissionsAsync();

            if (granted) {
                const {coords} = await getCurrentPositionAsync({enableHighAccuracy: true});
                const {latitude, longitude} = coords;

                setCurrentRegion({
                    latitude,
                    longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.04
                })
            }
        }

        loadInitialLocation();
    }, []);

    if (!currentRegion) {
        return null;
    }

    return (
        <MapView style={styles.map} initialRegion={currentRegion}>
            <Marker coordinate={{ latitude: -22.8230793, longitude: -43.2869129}}>
                <Image style={styles.avatar} source={{ uri:'https://avatars0.githubusercontent.com/u/41070501?s=460&u=32770585e48879a0900b6d38d7f85949c5543a2e&v=4' }} />

                <Callout onPress={()=>{
                    // Navegação
                    navigation.navigate('Profile', { github_username: 'brunograna' });
                }}>
                    <View style={styles.callout}>
                        <Text style={styles.devName}>Bruno Garcia</Text>
                        <Text style={styles.devBio}>Analista de Sistemas</Text>
                        <Text style={styles.devTechs}>Java, NodeJs</Text>
                    </View>
                </Callout>
            </Marker>
        </MapView>
    );
}

const styles = StyleSheet.create({
   map: {
       flex: 1
   },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 4,
        borderWidth: 4,
        borderColor: '#fff'
    },
    callout: {
        width: 260,
    },
    devName: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    devBio: {
        color: '#666',
        marginTop: 5,
    },
    devTechs: {
        marginTop: 5
    },

});

export default Main;