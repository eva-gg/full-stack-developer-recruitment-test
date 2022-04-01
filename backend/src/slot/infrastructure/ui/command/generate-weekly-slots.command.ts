import {Command, CommandRunner} from 'nest-commander';
import {CommandBus} from "@nestjs/cqrs";
import * as fs from "fs";
import {LocationPlanningSchemaValidator} from "./json-schema-validator/location-planning.schema-validator";

import {
    GenerateWeeklySlotsCommand as ApplicationGenerateWeeklySlotsCommand
} from "../../../application/command/generate-weekly-slots.command";
import {LocationPlanningMapper} from "./mapper/location-planning.mapper";
import {SlotMapper} from "./mapper/slot.mapper";

interface GenerateSlotsCommandOptions {
}

@Command({name: 'generate-weekly-slots', arguments: '<pathFile>', description: 'Generate slots for a week'})
export class GenerateWeeklySlotsCommand implements CommandRunner {
    constructor(private readonly commandBus: CommandBus) {
    }

    async run(
        inputs: string[],
        options?: GenerateSlotsCommandOptions,
    ): Promise<void> {
        const file = fs.readFileSync(inputs[0]);
        const json =
            LocationPlanningSchemaValidator.validate(JSON.parse(file.toString()));

        console.log(SlotMapper.mapDomainToOutput(await this.commandBus.execute(
            new ApplicationGenerateWeeklySlotsCommand(
                LocationPlanningMapper.mapInputToDomain(json),
            ))));
    }
}