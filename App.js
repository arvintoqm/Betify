import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TeamView from './app/Views/TeamView';
import RosterView from './app/Views/RosterView';
import PlayerPropsView from './app/Views/PlayerPropsView';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import BestBetsView from './app/Views/BestBetsView';
import PlayerStatsPickerView from './app/Views/PlayerStatsPickerView';
import PickSorter from './app/data/BestPicksSorter';
import { PickSorterProvider } from './app/data/PickSorterContext';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const PickSorterContext = React.createContext();

const SinglePropsStack = () => (
  <Stack.Navigator>
          <Stack.Screen
            name="Teams"
            component={TeamView}
            initialParams={{ screenType: "Props" }}
            options={{
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTintColor: '#fff'
            }}
            />
            <Stack.Screen 
              name="Players"
              component={RosterView}
              options={{
                headerStyle: {
                  backgroundColor: '#000000',
                },
                headerTintColor: '#fff'
              }}
            />
            <Stack.Screen 
              name="Props"
              component={PlayerPropsView}
              options={{
                headerStyle: {
                  backgroundColor: '#000000',
                },
                headerTintColor: '#fff'
              }}
            />
        </Stack.Navigator>
)

const BestBets = () => (
  <Stack.Navigator>
        <Stack.Screen
            name="Best Bets List"
            component={BestBetsView}
            options={{
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTintColor: '#fff'
            }}
        />
        <Stack.Screen
            name="Teams"
            component={TeamView}
            options={{
              headerStyle: {
                backgroundColor: '#000000',
              },
              headerTintColor: '#fff'
            }}
        />
        <Stack.Screen 
              name="Players"
              component={RosterView}
              options={{
                headerStyle: {
                  backgroundColor: '#000000',
                },
                headerTintColor: '#fff'
              }}
        />
        <Stack.Screen 
              name="Stats Picker"
              component={PlayerStatsPickerView}
              options={{
                headerStyle: {
                  backgroundColor: '#000000',
                },
                headerTintColor: '#fff'
              }}
        />
  </Stack.Navigator>
)

const ParleyBuilder = () => (
  <Text>Not Implemented Yet</Text>
)


export default function App() {

  return (
    <PickSorterProvider>
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'PlayerProps') {
              iconName = 'user';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Best Bets') {
              iconName = 'medal';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Parlay') {
              iconName = 'trophy';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            }
            return (
              <FontAwesome5
                name={iconName}
                size={size}
                color={color}
              />
            )
          }
        })}
        tabBarOptions={{
          activeTintColor: '#000',
          inactiveTintColor: '#555',
          activeBackgroundColor: '#fff',
          inactiveBackgroundColor: '#999',
          showLabel: true,
          labelStyle: { fontSize: 14 },
          showIcon: true,
        }}
        activeColor='#000000'
        inactiveColor='#000000'
        barStyle={{ backgroundColor: '#fff' }}
      >
      <Tab.Screen
          name="PlayerProps"
          component={SinglePropsStack}
          options={{
            tabBarLabel: 'Props',
            // Other tab options if needed
          }}
        />
      <Tab.Screen
          name="Best Bets"
          component={BestBets}
          options={{
            tabBarLabel: 'Best Bets',
            // Other tab options if needed
          }}
        />
      <Tab.Screen
          name="Parlay"
          component={ParleyBuilder}
          options={{
            tabBarLabel: 'Parlay',
            // Other tab options if needed
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
    </PickSorterProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
