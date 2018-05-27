import * as Data from '../config/Data';
import * as Actions from '../redux/Actions';

it('dispatches ADD_READING', () => {
  expect(Actions.addReading('some reading')((x) => x)).toEqual({ type: Actions.ADD_READING, reading: 'some reading' });
});

it('retrieves machines by site', () => {
  expect( Data.ids_by_site(Actions.sample.entities.machines.byId)['2'].sort()).toEqual(['5','6']);
});

it('retrieves points by machine', () => {
  expect( Data.ids_by_machine(Actions.sample.entities.points.byId)['5'].sort()).toEqual(['11','12']);
});

it('retrieves readings by point', () => {
  expect( Data.ids_by_point(Actions.sample.entities.newReadings.byId)['12']).toBe(undefined);
  expect( Data.ids_by_point(Actions.sample.entities.newReadings.byId)['11'].sort()).toEqual(['21','22']);
});
