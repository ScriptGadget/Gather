import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';

class Site extends Component {
  
  onLearnMore = data => {
    return machine => {
      this.props.navigation.navigate('Machine', { machine: machine, name: data.entities.machines.byId[machine].name });
    }
  };

  render() {
    const data = this.props.data;
    const site  = data.entities.sites.byId[this.props.navigation.state.params.site];
    return (
      <ScrollView>
        <Text>
          {site.name}
        </Text>

        <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{
            latitude: site.location.latitude,
            longitude: site.location.longitude,
            latitudeDelta: 1,
            longitudeDelta: 1,
          }}>
          <MapView.Marker
            coordinate={site.location}
            title={site.name}
            description={site.description}
          />
        </MapView>

        <List>
          {data.entities.machines.allIds.map(machine => (
            <ListItem
              key={machine}
              leftIcon={{ name: 'device-hub' }}
              title={`${data.entities.machines.byId[machine].name}`}
              onPress={() => this.onLearnMore(data)(machine)}
            />
          ))}
        </List>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Site);
