import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import teamsData from '../data/TeamRosters.js';

export default function RosterView({navigation, route}) {

    const {teamName}=route.params;

    const [Items, setItems] = useState(teamsData[teamName])

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                {
                    Items.map((item) => {
                        return (
                            <TouchableOpacity>
                                <View style={styles.teams} key={item.key}>
                                    <View style={styles.logobox} key={item.key}>
                                        <Image style={styles.logo} source={{uri: item.uri}} />
                                    </View>
                                    <View style={styles.textbox} key={item.name}>
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