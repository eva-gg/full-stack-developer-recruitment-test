export interface OpeningTimeRangeSchema {
  from: string;
  to: string;
}

export interface OpeningTimeSchema {
  monday?: OpeningTimeRangeSchema[];
  tuesday?: OpeningTimeRangeSchema[];
  wednesday?: OpeningTimeRangeSchema[];
  thursday?: OpeningTimeRangeSchema[];
  friday?: OpeningTimeRangeSchema[];
  saturday?: OpeningTimeRangeSchema[];
  sunday?: OpeningTimeRangeSchema[];
}

export interface TerrainSchema {
  name: string;
  players: number;
}

export interface LocationSchema {
  opening_time: OpeningTimeSchema;
  terrains: TerrainSchema[];
  session_duration: string;
}
