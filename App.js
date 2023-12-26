import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TeamView from './app/Views/TeamView';
import RosterView from './app/Views/RosterView';
import PlayerPropsView from './app/Views/PlayerPropsView';

const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
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
