import {ModuleRef} from '@nestjs/core';
import {CommandBus, EventBus} from '@nestjs/cqrs';
import {GenerateWeeklySlotsHandler} from "../../../../slot/application/command/generate-weekly-slots.handler";
import {GenerateWeeklySlotsCommand} from "../../../../slot/application/command/generate-weekly-slots.command";
import {LocationPlanning} from "../../../../slot/domain/location.planning";
import {OpeningTime} from "../../../../slot/domain/opening-time";
import * as moment from "moment";
import {Terrain} from "../../../../slot/domain/terrain";
import {Slot} from "../../../../slot/domain/slot";

describe('GenerateWeeklySlotsHandler', () => {

    let commandBus: CommandBus;
    let moduleRef: ModuleRef;

    let generateWeeklySlotsHandler: GenerateWeeklySlotsHandler;
    let eventBus: EventBus;

    beforeEach(async () => {
        eventBus = new EventBus(commandBus, moduleRef);
        generateWeeklySlotsHandler = new GenerateWeeklySlotsHandler(eventBus);
    });

    describe('execute', () => {
        it('should return empty array', async () => {
            const command = new GenerateWeeklySlotsCommand(new LocationPlanning(
                new OpeningTime([], [], [], [], [], [], []),
                [],
                moment.duration(30, 'minutes')
            ));
            const slots = await generateWeeklySlotsHandler.execute(command);

            expect(slots.length).toEqual(0);
        });

        it('should return 4 slots with 8 players on Monday', async () => {
            const command = new GenerateWeeklySlotsCommand(new LocationPlanning(
                new OpeningTime([
                    {from: moment('2022-03-28 11:00'), to: moment('2022-03-28 12:00')},
                    {from: moment('2022-03-28 13:00'), to: moment('2022-03-28 14:00')},
                ], [], [], [], [], [], []),
                [
                    new Terrain('A', 4),
                    new Terrain('B', 4)
                ],
                moment.duration(30, 'minutes')
            ));
            const slots = await generateWeeklySlotsHandler.execute(command) as Array<Slot>;

            expect(slots.length).toEqual(4);
            expect(slots[0].weekDay).toEqual('monday');
            expect(slots[0].availablePlayers).toEqual(8);
        });
    });

});