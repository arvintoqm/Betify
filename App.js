import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TeamView from './app/Views/TeamView';
import RosterView from './app/Views/RosterView';
import PlayerPropsView from './app/Views/PlayerPropsView';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const SinglePropsStack = () => (
  <Stack.Navigator>
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
  <Text>Not Implemented Yet</Text>
)

const ParleyBuilder = () => (
  <Text>Not Implemented Yet</Text>
)


export default function App() {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size, color }) => {
            let iconName;
            if (route.name === 'Props') {
              iconName = 'user';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Best Bets') {
              iconName = 'medal';
              size = focused ? 25 : 20;
              color = focused ? '#f0f' : '#555';
            } else if (route.name === 'Parley') {
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
          name="Props"
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
          name="Parley"
          component={ParleyBuilder}
          options={{
            tabBarLabel: 'Parley',
            // Other tab options if needed
          }}
        />
        
      </Tab.Navigator>
    </NavigationContainer>
    
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
