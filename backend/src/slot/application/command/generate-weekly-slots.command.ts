import {LocationPlanning} from "../../domain/location.planning";

export class GenerateWeeklySlotsCommand {
    constructor(
        public readonly locationPlanning: LocationPlanning,
    ) {
    }
}