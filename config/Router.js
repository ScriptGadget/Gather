import React from 'react';
import { TabNavigator, createStackNavigator } from 'react-navigation';
import { Icon } from 'react-native-elements';

import SiteList from '../components/SiteList';
import Site from '../components/Site';
import Machine from '../components/Machine';
import MeasurementPoint from '../components/MeasurementPoint';

export const MeasurementStack = createStackNavigator({
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

export const Root = createStackNavigator({
  Measure: {
    screen: MeasurementStack
  }
}, {
  mode: 'modal',
  headerMode: 'none',
});

export default Root;


