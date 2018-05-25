import React, { Component } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { MapView } from 'expo';

import { connect } from 'react-redux';

import * as Actions from '../redux/Actions'; //Import your actions

import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';

class SiteList extends Component {
  onLearnMore = site => {
    this.props.navigation.navigate('Site', { site });
  };

  componentDidMount() {
    this.props.getData(); //call our action
  }

  render() {
    const data = this.props.data;
    
    if (this.props.loading) {
      return (
        <View style={styles.activityIndicatorContainer}>
          <ActivityIndicator animating={true} />
        </View>
      );
    } else {

      return (
        <ScrollView>
          <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 10,
          longitudeDelta: 10,
        }}>

        {data.entities.sites.allIds.map(site => (
          <MapView.Marker
            key={site}
            coordinate={data.entities.sites.byId[site].location}
            title={`${data.entities.sites.byId[site].name}`}
            description={`${data.entities.sites.byId[site].description}`}
          />
        ))}
        </MapView>

          <List>
          {data.entities.sites.allIds.map(site => (
            <ListItem
              key={site}
              leftIcon={{ name: 'place' }}
              title={`${data.entities.sites.byId[site].name}`}
              onPress={() => this.onLearnMore(site)}
            />
          ))}
        </List>
          </ScrollView>
      );
      
    }
  }
}

const styles = StyleSheet.create({
  activityIndicatorContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});

//Connect everything
export default connect(mapStateToProps, mapDispatchToProps)(SiteList);
