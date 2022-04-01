import moment from "moment";

export class OpeningTime {
    constructor(public readonly monday: Array<moment.FromTo>,
                public readonly tuesday: Array<moment.FromTo>,
                public readonly wednesday: Array<moment.FromTo>,
                public readonly thursday: Array<moment.FromTo>,
                public readonly friday: Array<moment.FromTo>,
                public readonly saturday: Array<moment.FromTo>,
                public readonly sunday: Array<moment.FromTo>) {
    }
}