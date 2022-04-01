import {LocationPlanningSchema} from "./location-planning.schema";
import {LocationPlanningJsonInput} from "../input/location-planning-json.input";

export class LocationPlanningSchemaValidator {
    public static validate(json: any): LocationPlanningJsonInput {
        const validateResponse = LocationPlanningSchema.validate(json);

        if (validateResponse.error !== undefined) {
            throw new Error(validateResponse.error)
        }

        return validateResponse.value as LocationPlanningJsonInput;
    }
}