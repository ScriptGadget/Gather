import { bindActionCreators, combineReducers } from 'redux';

import * as Actions from "./Actions" //Import the actions types constant we defined in our actions

import sha1 from 'sha1';

let initialState = {
  data: [],
  newReadings: {
    byId: { },
    allIds: []
  },
  loading:true,
  signedIn: false,
  lastSynced: 0
};

const dataReducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.DATA_AVAILABLE:
      state = Object.assign({}, state, { data: action.data, loading:false });
      return state;
    
    case Actions.ADD_READING:
      var newReadingId = sha1(JSON.stringify(action.reading));
      var newReading = Object.assign({}, action.reading, {id: newReadingId});
      var newData = Object.assign({}, state.newReadings);
      newData.byId[newReadingId] = newReading;
      newData.allIds = [...newData.allIds, newReadingId];
      state = Object.assign({}, state, { newReadings: newData });
      return state;
    
     case Actions.READING_SYNCED:
      // remove a new reading that has been successfully synced
      newState = Object.assign({}, state, { lastSynced: Date.now() });
      delete newState.newReadings.byId[action.readingId];
      newState.newReadings.allIds = state.newReadings.allIds.filter(x => x != action.readingId);
      return newState;
    
    default:
     return state;
  }
};

// Combine all the reducers
const rootReducer = combineReducers({
    dataReducer
    // ,[ANOTHER REDUCER], [ANOTHER REDUCER] ....
})


// The function takes data from the app current state,
// and insert/links it into the props of our component.
// This function makes Redux know that this component needs to be passed a piece of the state
export function mapStateToProps(state, props) {
  return {
    data: state.dataReducer.data,
    newReadings: state.dataReducer.newReadings,
    loading: state.dataReducer.loading,
    signedIn: state.dataReducer.signedIn
  }
}

// Doing this merges our actions into the component’s props,
// while wrapping them in dispatch() so that they immediately dispatch an Action.
// Just by doing this, we will have access to the actions defined in out actions file (action/home.js)
export function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}


export default rootReducer;
