export default class Terrain {
  readonly name: string;
  readonly players: number;

  constructor(name: string, players: number) {
    this.name = name;
    this.players = players;
  }
}
