import React, { useState } from 'react';
import { Text, StyleSheet, View, SafeAreaView, Image, ScrollView, TextInput, Button, TouchableOpacity, Alert } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import Player from '../data/PlayerStats';

export default function PlayerPropsView({ navigation, route }) {

    const { playerName, picture } = route.params;

    const player = new Player(playerName.split(" ").join("_"));

    const [selectedValue, setSelectedValue] = useState('Points');

    const [textInputValue, setTextInputValue] = useState('');

    const [selectedSide, setSelectedSide] = useState(null);

    const [showFractionView, setShowFractionView] = useState(false);

    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');

    const [l1Fraction, setl1] = useState('');
    const [l2Fraction, setl2] = useState('');
    const [l3Fraction, setl3] = useState('');
    const [l1Per, setl1Per] = useState('');
    const [l2Per, setl2Per] = useState('');
    const [l3Per, setl3Per] = useState('');


    const handleButtonPress = async () => {
      try {
        if (!textInputValue || !selectedSide || !value1 || !value2) {
          Alert.alert("Please Fill all parameters");
        } else {

          await player.setStats();

          // Use async/await to wait for the promises to resolve
          let lst1 = await player.getStats(selectedValue, value1, selectedSide, textInputValue);
          let lst2 = await player.getStats(selectedValue, value2, selectedSide, textInputValue);
          let lst3 = await player.getStats(selectedValue, 'season', selectedSide, textInputValue);
    
          // Now update the state after the promises have resolved
          setl1(lst1[0]);
          setl2(lst2[0]);
          setl3(lst3[0]);
          setl1Per(lst1[1]);
          setl2Per(lst2[1]);
          setl3Per(lst3[1]);
          setShowFractionView(true);
        }
      } catch (error) {
        console.error('Error fetching player stats:', error);
      }
    };

      const handleSideClick = (side) => {
        setSelectedSide(side);
      };
    
    

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.textbox}>
                    <Text style={styles.text}>
                        {playerName}
                    </Text>
                </View>

                <View style={styles.logobox}>
                    <Image style={styles.logo} source={{uri: picture}}/>
                </View>

                <View style={styles.textButton}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Enter text here"
                        value={textInputValue}
                        onChangeText={(text) => setTextInputValue(text)}
                        keyboardType="numeric"
                        maxLength={4}
                    />
                    <Button title="Continue        " onPress={handleButtonPress} />
                </View>

                

                {showFractionView && (
                  <View style={styles.fractionView}>
                    <View style={styles.fractionContainer}>
                      <Text style={styles.fractionLabel}>{`L${value1}`}</Text>
                      <Text style={styles.fractionPercentage}>{`${l1Fraction}`}</Text>
                      <Text style={styles.fractionPercentage}>{`${l1Per}`}</Text>
                    </View>

                    <View style={styles.fractionContainer}>
                      <Text style={styles.fractionLabel}>{`L${value2}`}</Text>
                      <Text style={styles.fractionPercentage}>{`${l2Fraction}`}</Text>
                      <Text style={styles.fractionPercentage}>{`${l2Per}`}</Text>
                    </View>

                    <View style={styles.fractionContainer}>
                      <Text style={styles.fractionLabel}>2023 Season</Text>
                      <Text style={styles.fractionPercentage}>{`${l3Fraction}`}</Text>
                      <Text style={styles.fractionPercentage}>{`${l3Per}`}</Text>
                    </View>
                  </View>
                )}

                <View style={styles.lastGames}>
                  <View style={styles.textFieldContainer}>
                    <Text style={styles.label}>Last Games:</Text>
                    <TextInput
                      style={styles.textField}
                      keyboardType="numeric"
                      maxLength={2}
                      value={value1}
                      onChangeText={(text) => setValue1(text)}
                    />
                  </View>

                  <View style={styles.textFieldContainer}>
                    <Text style={styles.label}>Last Games:</Text>
                    <TextInput
                      style={styles.textField}
                      keyboardType="numeric"
                      maxLength={2}
                      value={value2}
                      onChangeText={(text) => setValue2(text)}
                    />
                  </View>
                </View>


                <View>
                    <Picker
                    selectedValue={selectedValue}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    style={styles.picker}
                    itemStyle={styles.pickerItem}
                    >
                        <Picker.Item label="Points" value="Points" />
                        <Picker.Item label="Assists" value="Assists" />
                        <Picker.Item label="Rebounds" value="Rebounds" />
                        <Picker.Item label="Steals" value="Steals" />
                        <Picker.Item label="Blocks" value="Blocks" />
                        <Picker.Item label="Threes Made" value="Threes Made" />
                        <Picker.Item label="Points + Assists" value="Points + Assists" />
                        <Picker.Item label="Points + Rebounds" value="Points + Rebounds" />
                        <Picker.Item label="Rebounds + Assists" value="Rebounds + Assists" />
                        <Picker.Item label="Points + Assists + Rebounds" value="Points + Assists + Rebounds" />
                        <Picker.Item label="Steals + Blocks" value="Steals + Blocks" />
                    </Picker>
                </View>

                <View style={styles.overUnder}>
                    <TouchableOpacity
                        style={[
                        styles.side,
                        selectedSide === 'left' ? styles.selectedLeft : null,
                        ]}
                        onPress={() => handleSideClick('left')}
                    >
                        <Text style={styles.overUnderText}>Over</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={[
                        styles.side,
                        selectedSide === 'right' ? styles.selectedRight : null,
                        ]}
                        onPress={() => handleSideClick('right')}
                    >
                        <Text style={styles.overUnderText}>Under</Text>
                    </TouchableOpacity>
                </View>

                
                

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
        height: '100%',
        resizeMode: 'contain',
      },
      text: {
        color: '#fff',
        fontSize: 40,
        margin: 10,
        marginBottom: 2,
      },
      logobox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 400,
        marginTop: 0, 
      },
      textbox:{
        width: '100%',
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 0,
      },
      picker: {
        // height: 50,
        // width: 200,
        backgroundColor: '#000',
        color: '#fff', // Text color
      },
      pickerItem: {
        color: '#fff', // Color of individual items
      },
      textInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 8,
        marginRight: 10, // Adjust the margin based on your design
        borderRadius: 4, // Adjust the borderRadius based on your design
        color: '#000',  // Text color
        backgroundColor: '#f2f2f2',  // Background color
      },
      textButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 16, // Adjust the padding based on your design
        marginTop: 16, // Adjust the margin based on your design
      },
      overUnder: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 16,
      },
      side: {
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '#000',
      },
      selectedLeft: {
        backgroundColor: 'green',
      },
      selectedRight: {
        backgroundColor: 'red',
      },
      overUnderText: {
        color: '#fff',
        fontSize: 20,
      },
      lastGames: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
      },
      textFieldContainer: {
        flex: 1,
        alignItems: 'center',
      },
      label: {
        color: '#fff',
        fontSize: 16,
        marginBottom: 8,
      },
      textField: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 4,
        padding: 8,
        width: '40%',
        color: '#000',  // Text color
        backgroundColor: '#f2f2f2',  // Background color
      },
      fractionView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 16,
      },
      fractionContainer: {
        backgroundColor: '#333333',
        flex: 1,
        alignItems: 'center',
      },
      fractionLabel: {
        color: 'red',
        fontSize: 16,
        marginBottom: 8,
      },
      fractionPercentage: {
        color: '#fff',
        fontSize: 16,
      },
});