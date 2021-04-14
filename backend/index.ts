import CalendarApi from "./calendar/application/calendar.api";
import { processLocationJsonData } from "./calendar/infrastructure/location.reader";
import LocationRepository from "./calendar/infrastructure/location.repository";
import SlotRepository from "./calendar/infrastructure/slot.repository";
import * as fs from "fs";

const [, , inputFile, outputFile] = process.argv;

const rawData = fs.readFileSync(inputFile, "utf-8");

const location = processLocationJsonData(rawData);
const locationRepository = new LocationRepository();
const slotRepository = new SlotRepository();
locationRepository.addLocation(location);

const calendarApi = new CalendarApi(locationRepository, slotRepository);

const slots = calendarApi.getNextDaysSlots({
  from: "2021-04-10",
  days: 10,
});

fs.writeFileSync(outputFile, JSON.stringify(slots), "utf-8");
