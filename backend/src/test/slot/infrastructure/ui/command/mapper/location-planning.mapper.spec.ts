import {LocationPlanningMapper} from "../../../../../../slot/infrastructure/ui/command/mapper/location-planning.mapper";
import * as moment from "moment";

describe('LocationPlanningMapper', () => {

    const CLASSIC_INPUT_JSON = {
        opening_time: {
            monday: [{from: '10:30', to: '12:30'}],
            tuesday: [],
            wednesday: [],
            saturday: []
        },
        terrains: [{name: 'A', players: 12}, {name: 'B', players: 6}],
        session_duration: '00:30'
    }

    const OVER_DAY_INPUT_JSON = {
        opening_time: {
            monday: [{from: '10:30', to: '03:30'}],
            tuesday: [],
            wednesday: [],
            saturday: []
        },
        terrains: [{name: 'A', players: 12}, {name: 'B', players: 6}],
        session_duration: '00:30'
    }


    describe('mapInputToDomain', () => {
        it('should return LocationPlanning with classic slot', async () => {

            const locationPlanning = LocationPlanningMapper.mapInputToDomain(CLASSIC_INPUT_JSON);

            expect(locationPlanning.openingTime.monday.length).toEqual(1);
            expect(locationPlanning.terrains.length).toEqual(2);
        });

        it('should return LocationPlanning with slot when it exceeds on another day', async () => {

            const locationPlanning = LocationPlanningMapper.mapInputToDomain(OVER_DAY_INPUT_JSON);

            expect(locationPlanning.openingTime.monday.length).toEqual(1);
            expect(locationPlanning.terrains.length).toEqual(2);
            expect(moment(locationPlanning.openingTime.monday[0].from).isBefore(locationPlanning.openingTime.monday[0].to)).toEqual(true)
        });
    });
});