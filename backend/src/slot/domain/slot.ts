export class Slot {
    constructor(public readonly weekDay: string,
                public readonly startTime: string,
                public readonly endTime: string,
                public readonly availablePlayers: number,) {
    }
}