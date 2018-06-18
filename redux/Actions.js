export const DATA_AVAILABLE = 'DATA_AVAILABLE';
export const ADD_READING = 'ADD_READING';

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
        data.entities["newReadings"] = {"byId": {}, "allIds": []};
        dispatch({ type: DATA_AVAILABLE, data:  data});
      })
      .catch((error) => {
        console.log("Server not available: " + error);
      });
  };
}

export function addReading(reading) {
  return dispatch => {
      return dispatch({ // return is just for easy unit testing
        type: ADD_READING,
        reading: reading
      });
  }
}
