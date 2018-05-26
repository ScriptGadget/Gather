import React, { Component } from 'react';
import { Text, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import { MapView } from 'expo';
import { connect } from 'react-redux';
import {mapStateToProps, mapDispatchToProps} from '../redux/Reducers';
import * as Data from '../config/Data';

class Site extends Component {
  
  onLearnMore = data => {
    return machine => {
      this.props.navigation.navigate('Machine', { machine: machine, name: data.entities.machines.byId[machine].name });
    }
  };

  render() {
    const data = this.props.data;
    const site  = data.entities.sites.byId[this.props.navigation.state.params.site];
    const machines = Data.ids_by_site(data.entities.machines.byId)[site.id];
    
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
          {machines ? machines.map((machine, i) => (
            <ListItem
              key={i}
              leftIcon={{ name: 'device-hub' }}
              title={`${data.entities.machines.byId[machine].name}`}
              onPress={() => this.onLearnMore(data)(machine)}
            />
          )) : <ListItem
                 key={'0'}
                 leftIcon={{ name: 'cancel'}}
                 title='No Machines At This Site'
                 hideChevron
              />}
        </List>
      </ScrollView>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Site);
