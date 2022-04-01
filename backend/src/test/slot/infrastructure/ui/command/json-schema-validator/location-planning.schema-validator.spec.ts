import {
    LocationPlanningSchemaValidator
} from "../../../../../../slot/infrastructure/ui/command/json-schema-validator/location-planning.schema-validator";

describe('LocationPlanningSchemaValidator', () => {

    const SUCCEED_JSON = {
        opening_time: {
            monday: [{from: '10:30', to: '12:30'}],
            tuesday: [],
            wednesday: [],
            saturday: []
        },
        terrains: [{name: 'A', players: 12}, {name: 'B', players: 6}],
        session_duration: '00:30'
    }

    const FAILED_JSON = {
        opening_time: {
            monday: [{from: '10:30', to: 'test'}],
            tuesday: [],
            wednesday: [],
            saturday: []
        },
        terrains: [{name: 'A', players: 12}, {name: 'B', players: 6}],
        session_duration: '00:30'
    }


    describe('validate', () => {
        it('should return LocationPlanningJsonInput', async () => {

            const validateResponse = LocationPlanningSchemaValidator.validate(SUCCEED_JSON);

            expect(validateResponse).toBeDefined();
        });

        it('should throw an ValidationError', async () => {

            expect(() => {
                    LocationPlanningSchemaValidator.validate(FAILED_JSON)
                }
            ).toThrowError();
        });
    });
});