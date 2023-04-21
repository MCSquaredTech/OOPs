import { Drone } from "./classes/drone.js";
import { Car } from "./classes/car.js";
import { fleet } from "./fleet-data.js";
import { FleetDataService } from "./services/fleet-data-service.js";

let dataService = new FleetDataService();
dataService.loadData(fleet); 

console.log(dataService.cars);
console.log(dataService.drones);

let drone = dataService.getDroneByLicense('QRS678');
console.log(drone);

for (let e of dataService.errors) {
    console.log(e.message);
}


