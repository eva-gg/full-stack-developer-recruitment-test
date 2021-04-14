import OpeningTime from "./OpeningTime";
import Terrain from "./Terrain";
import Time from "./Time";

export default class Location {
  readonly openingTime: OpeningTime;
  readonly terrains: Terrain[];
  readonly sessionDuration: Time;

  constructor(
    openingTime: OpeningTime,
    terrains: Terrain[],
    sessionDuration: Time
  ) {
    this.openingTime = openingTime;
    this.terrains = terrains;
    this.sessionDuration = sessionDuration;
  }
}
