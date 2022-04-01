import {SlotMapper} from "../../../../../../slot/infrastructure/ui/command/mapper/slot.mapper";

describe('SlotMapper', () => {

    describe('mapDomainToOutput', () => {
        it('should return SlotOutput JSON format', async () => {

            const result = SlotMapper.mapDomainToOutput([])

            expect(result).toBeDefined();
        });
    });
});