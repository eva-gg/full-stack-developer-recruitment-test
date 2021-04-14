import { Duration } from "moment";
import OpeningTime from "./OpeningTime";
import Terrain from "./Terrain";
import Time from "./Time";

export default class Location {
  readonly openingTime: OpeningTime;
  readonly terrains: Terrain[];
  readonly sessionDuration: Duration;

  constructor(
    openingTime: OpeningTime,
    terrains: Terrain[],
    sessionDuration: Duration
  ) {
    this.openingTime = openingTime;
    this.terrains = terrains;
    this.sessionDuration = sessionDuration;
  }
}
