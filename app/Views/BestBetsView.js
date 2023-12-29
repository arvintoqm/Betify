import React, {useContext} from 'react';
import { SafeAreaView, ScrollView, TouchableOpacity, View, StyleSheet, Text } from 'react-native';
import PickSorter from '../data/BestPicksSorter';

export default function BestBetsView({navigation}) {


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate("Teams",  {screenType: "Stats Picker"})}>
                    <View style={styles.box}>
                        <Text style={styles.text}>Add a bet</Text>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        flexDirection: 'column',
        alignItems: 'center',
      },
      box: {
        width: 200,
        height: 100,
        backgroundColor: 'green',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'blue',
      },
      text: {
        color: '#fff',
        fontSize: 30,
        margin: 10,
      },
})

