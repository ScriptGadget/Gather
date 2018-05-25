import * as Actions from '../redux/Actions';

it('dispatches ADD_READING', () => {
  expect(Actions.addReading('some reading')((x) => x)).toEqual({ type: Actions.ADD_READING, reading: 'some reading' });
});

it('retrieves machines by site', () => {
  expect( Actions.ids_by_site(Actions.sample.entities.machines.byId)['2'].sort()).toEqual(['5','6']);
});
