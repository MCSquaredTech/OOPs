
import { Drone } from "./classes/drone.js";
import { Car } from "./classes/car.js";
import { fleet } from "./fleet-data.js";
import { FleetDataService } from "./services/fleet-data-service.js";

let dataService = new FleetDataService();
let cars = dataService.cars;
let drones = dataService.drones;

dataService.loadData(fleet); 

console.log(cars);
console.log(drones);

let vehicle = dataService.getByLicense(cars, 'AT9900');
console.log(vehicle);

let sortedCars = dataService.sortByLicenseNumber(drones);
console.log(sortedCars);

for (let e of dataService.errors) {
    console.log(e.message);
}


