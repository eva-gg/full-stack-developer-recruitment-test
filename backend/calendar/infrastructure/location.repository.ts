import Location from "../domain/Location";

export default class LocationRepository {
  private readonly _locations: Location[] = [];

  addLocation(location: Location) {
    this._locations.push(location);
  }

  findLocation() {
    return this._locations[0];
  }
}
