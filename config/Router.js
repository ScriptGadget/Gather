import React from 'react';
import { createStackNavigator, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
// import { Icon } from 'react-native-elements';
import { Ionicons } from '@expo/vector-icons';

import SignIn from '../components/SignIn';
import Settings from '../components/Settings';
import SiteList from '../components/SiteList';
import Site from '../components/Site';
import Machine from '../components/Machine';
import MeasurementPoint from '../components/MeasurementPoint';

export const Measurements = createStackNavigator({
  SiteList: {
    screen: SiteList,
    navigationOptions: {
      title: 'My Route',
    },
  },
  Site: {
    screen: Site,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  },
  Machine: {
    screen: Machine,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    })
  },
  MeasurementPoint: {
    screen: MeasurementPoint,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.name}`,
    }),
  }
});

export const SignedIn = createMaterialBottomTabNavigator({
  Measurements: {
    screen: Measurements,
    navigationOptions: {
      tabBarIcon: () => {return (<Ionicons name="md-timer" size={16} color="white" />)},
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      tabBarIcon: () => {return (<Ionicons name="md-settings" size={16} color="white" />)},
    }
  },

});

export const SignedOut = createStackNavigator({
  SignIn: {
    screen: SignIn,
    navigationOptions: {
      title: "Sign In"
    }
  }
});

export const createRootNavigator = (signedIn = false) => {
  return createSwitchNavigator(
    {
      SignedIn: {
        screen: SignedIn
      },
      SignedOut: {
        screen: SignedOut
      }
    },
    {
      initialRouteName: signedIn ? "SignedIn" : "SignedOut"
    }
  );
};
