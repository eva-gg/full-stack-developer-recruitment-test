import {CommandHandler, EventBus, ICommandHandler} from '@nestjs/cqrs';
import {GenerateWeeklySlotsCommand} from "./generate-weekly-slots.command";
import {WeeklySlotsGeneratedEvent} from "../event/weekly-slots-generated.event";
import * as moment from 'moment';
import {Slot} from "../../domain/slot";

@CommandHandler(GenerateWeeklySlotsCommand)
export class GenerateWeeklySlotsHandler implements ICommandHandler<GenerateWeeklySlotsCommand> {
    constructor(
        private readonly eventBus: EventBus,
    ) {
    }

    async execute(command: GenerateWeeklySlotsCommand): Promise<Array<Slot>> {

        const slots = [];

        const availablePlayers = command.locationPlanning.terrains.reduce((acc, terrain) => {
            return acc + terrain.players;
        }, 0);

        for (const day in command.locationPlanning.openingTime) {
            slots.concat(slots, command.locationPlanning.openingTime[day]?.map((periodRange: moment.FromTo) => {
                const startSlot = moment(periodRange.from);
                const endSlot = moment(periodRange.from).add(command.locationPlanning.sessionDuration);
                while (endSlot.isSameOrBefore(periodRange.to)) {
                    slots.push(new Slot(day, startSlot.format('HH:mm'), endSlot.format('HH:mm'), availablePlayers));
                    startSlot.add(command.locationPlanning.sessionDuration)
                    endSlot.add(command.locationPlanning.sessionDuration)
                }
            }));
        }

        this.eventBus.publish(new WeeklySlotsGeneratedEvent(command.locationPlanning, slots));

        return slots;
    }
}