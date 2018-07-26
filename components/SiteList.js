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

import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';

class SiteList extends Component {
  onLearnMore = data => {
    return site => {
      this.props.navigation.navigate('Site', { site: site, name: data.entities.sites.byId[site].name } );
    }
  };

  componentDidMount() {
    this.props.getData();
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
      if (data.entities.sites.allIds.length < 1) {
        return (
            <ScrollView>
              <Text style={{ alignSelf: 'stretch', height: 200, padding: 50 }}>
                No Route Found. Please contact your operator to make sure you have been assigned a route.
              </Text>
            </ScrollView>
        );
      }
      else
      {
        return (
          <ScrollView>
            <MapView
              style={{ alignSelf: 'stretch', height: 200 }}
              region={{
              latitude: 35.12,
              longitude: -102.01,
              latitudeDelta: 3,
              longitudeDelta: 3,
              }}>

              {data.entities.sites.allIds.map(site => (
                <MapView.Marker
                  key={site}
                  coordinate={{
                    latitude: data.entities.sites.byId[site].location.lat,
                    longitude: data.entities.sites.byId[site].location.lng,
                  }}
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
                  onPress={() => this.onLearnMore(data)(site)}
                />
              ))}
            </List>

        </ScrollView>
      );
      }
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

export default connect(mapStateToProps, mapDispatchToProps)(SiteList);
