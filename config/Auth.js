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

export const onSignOut = () => AsyncStorage.removeItem(USER_KEY);

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
