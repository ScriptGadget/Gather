export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_READING = 'ADD_READING';
export const READING_SYNCED = 'READING_SYNCED';

// Based on: https://medium.com/the-react-native-log/building-an-authentication-flow-with-react-navigation-fb5de2203b5c

import { AsyncStorage } from "react-native";

export const USER_KEY = "gather-auth-key";

export const onSignIn = (user, pass) => {
  return fetch('http://192.168.1.150:3000/api/Users/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: user,
      password: pass,
    }),
  }).then((response) => response.json())
    .then((responseJson) => {
      if(responseJson && responseJson.id) {
        return AsyncStorage.setItem(USER_KEY, responseJson.id)
      } else {
        return Promise.reject(new Error('login failed'));
      }
    });
}

// We call clear because we don't want any of the redux-persist
// data to remain either.
export const onSignOut = () => AsyncStorage.clear();

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(USER_KEY)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

export function getData() {
  return dispatch => {
    //Make API Call
    fetch('http://192.168.1.150:3000/api/Routes/mine/', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }).then((response) => response.json())
      .then((responseJson) => {
        data = responseJson["mine"];
        dispatch({ type: DATA_AVAILABLE, data:  data});
      }).catch((error) => {
        console.log("Retrieving Sites - Server not available: " + error);
      });
  };
}

export function addReading(reading) {
  return dispatch => {
      return dispatch({ // this return is just for easy unit testing
        type: ADD_READING,
        reading: reading
      });
  }
}

export function syncReadings(readings) {
  return dispatch => {
    Object.values(readings.byId).map((reading) => { 
      fetch('http://192.168.1.150:3000/api/Readings', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reading)
      }).then((response) => {
        dispatch({ type: READING_SYNCED, readingId: reading.id });
        getData()(dispatch); // check for changes on the server.
      }).catch((error) => {
          console.log("Syncing Readings - Server not available: " + error);
        });
    });
  };
}
