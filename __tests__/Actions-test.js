import * as Data from '../config/Data';
import * as Actions from '../redux/Actions';
import * as Sample from '../__samples__/Sample-data.js';

it("dispatches ADD_READING", () => {
  expect(Actions.addReading("some reading")((x) => x)).toEqual({ type: Actions.ADD_READING, reading: "some reading" });
});

it("retrieves machines by site", () => {
  expect( Data.ids_by_site(Sample.entities.machines.byId)[2].sort()).toEqual(["2", "3"]);
});

it("retrieves points by machine", () => {
   expect( Data.ids_by_machine(Sample.entities.points.byId)[3].sort()).toEqual(["3", "4"]);
});

it("retrieves history by point", () => {
  expect( Data.ids_by_point(Sample.entities.readings.byId)[12]).toBe(undefined);
  expect( Data.ids_by_point(Sample.entities.readings.byId)[1].sort()).toEqual(["1", "2"]);
  expect( Data.ids_by_point(Sample.entities.readings.byId)[4].sort()).toEqual(["7", "8"]);  
});
