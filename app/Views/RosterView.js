import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import teamsData from '../data/TeamRosters.js';
import Player from '../data/PlayerStats.js';

export default function RosterView({navigation, route}) {

    const {teamName}=route.params;

    const [Items, setItems] = useState(teamsData[teamName])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Items.map((item) => {
                        return (
                            <TouchableOpacity key={item.key} onPress={async () => { navigation.navigate("Props",  {playerName: item.name, picture: item.uri}, )
                                // const player = new Player(item.name.split(" ").join("_"));
                                // console.log(await player.getStats("Points + Assists + Rebounds"));
                            }}>
                                <View style={styles.teams}>
                                    <View style={styles.logobox}>
                                        <Image style={styles.logo} source={{uri: item.uri}} />
                                    </View>
                                    <View style={styles.textbox}>
                                        <Text style={styles.text}>{item.name}</Text>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
      },
      logo: {
        width: '100%',
        height: "100%",
        resizeMode: 'contain',
      },
      teams: {
        height: 100,
        width: '100%',
        margin: 10,
        backgroundColor: '#b1002d',
        flexDirection: 'row',
      },
      text: {
        color: '#fff',
        fontSize: 30,
        margin: 10,
      },
      logobox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      textbox:{
        flex: 4,
        justifyContent: 'center',
        alignItems: 'center',
      }
})