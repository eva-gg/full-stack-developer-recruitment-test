import {Terrain} from "./terrain";
import {OpeningTime} from "./opening-time";
import moment from "moment";

export class LocationPlanning {
    constructor(public readonly openingTime: OpeningTime,
                public readonly terrains: Array<Terrain>,
                public readonly sessionDuration: moment.Duration,) {
    }
}