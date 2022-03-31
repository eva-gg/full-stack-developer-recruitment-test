import {Slot} from "../../../../domain/slot";

export class SlotMapper {
    public static mapDomainToOutput(slots: Array<Slot>): string {
        return JSON.stringify(slots, null, '\t');
    }
}