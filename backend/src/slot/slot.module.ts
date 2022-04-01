import {Module} from '@nestjs/common';
import {GenerateWeeklySlotsCommand} from "./infrastructure/ui/command/generate-weekly-slots.command";
import {CqrsModule} from "@nestjs/cqrs";
import {GenerateWeeklySlotsHandler} from "./application/command/generate-weekly-slots.handler";

@Module({
    imports: [CqrsModule],
    controllers: [],
    providers: [GenerateWeeklySlotsCommand, GenerateWeeklySlotsHandler],
})
export class SlotModule {
}
