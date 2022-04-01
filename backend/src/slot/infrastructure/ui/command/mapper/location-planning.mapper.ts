import {LocationPlanningJsonInput} from "../input/location-planning-json.input";
import {LocationPlanning} from "../../../../domain/location.planning";
import {OpeningTime} from "../../../../domain/opening-time";
import * as moment from "moment";
import {Terrain} from "../../../../domain/terrain";

export class LocationPlanningMapper {
    public static mapInputToDomain(json: LocationPlanningJsonInput): LocationPlanning {
        return new LocationPlanning(
            new OpeningTime(
                json.opening_time.monday?.map(LocationPlanningMapper.mapFromToJsonToFromTo),
                json.opening_time.tuesday?.map(LocationPlanningMapper.mapFromToJsonToFromTo),
                json.opening_time.wednesday?.map(LocationPlanningMapper.mapFromToJsonToFromTo),
                json.opening_time.thursday?.map(LocationPlanningMapper.mapFromToJsonToFromTo),
                json.opening_time.friday?.map(LocationPlanningMapper.mapFromToJsonToFromTo),
                json.opening_time.saturday?.map(LocationPlanningMapper.mapFromToJsonToFromTo),
                json.opening_time.sunday?.map(LocationPlanningMapper.mapFromToJsonToFromTo)
            ),
            json.terrains.map((jsonTerrain) => new Terrain(jsonTerrain.name, jsonTerrain.players)),
            moment.duration(moment(json.session_duration).hour(), "hour").add(moment(json.session_duration).minutes(), "minutes")
        );
    }

    private static mapFromToJsonToFromTo(fromToJson: { from: string, to: string }): moment.FromTo {
        const from = moment(fromToJson.from, "HH:mm");

        /* Convert slot when it exceeds on another day (example : from 22:30 - to 03:00  */
        const to = moment(fromToJson.to, "HH:mm").isBefore(from) ? moment(fromToJson.to, "HH:mm").add(1, "day") : moment(fromToJson.to);

        return {
            from,
            to
        }
    }
}