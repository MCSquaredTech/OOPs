
import { Car } from '../classes/car.js';
import { Drone } from '../classes/drone.js';
import { DataError } from './data-error.js';

export class FleetDataService { 

    constructor() { 
        this.cars = []; 
        this.drones = [];
        this.errors = [];
    }

    getByLicense(vehicles, licenseNumber) {
        return vehicles.find(vObject => {
            return vObject._license == licenseNumber;
        });
    }

    sortByLicenseNumber(vehicles) { 
        return vehicles.sort((a, b) => { 
            return a._license < b._license ? -1 : 1; 
        }); 
    }

    loadData(fleet) { 
        for (let data of fleet) { 
            switch(data.type) { 
                case 'car': 
                    if(this.validateVehicleType(data));{
                        let car = this.createCar(data);
                        if(car) {
                            this.cars.push(car);
                        }
                    }
                    
                    break;
                case 'drone': 
                    if (this.validateVehicleType(data)) { 
                        let drone = this.createDrone(data);
                        if (drone) { 
                            this.drones.push(drone); 
                        }
                    }
                    break;
                default: 
                    let e = new DataError('Invalid Vehicle Type', data);
                    this.errors.push(e);
                    break;
            }
        }
    }

    validateVehicleType(vehicle) {
        let hasErrors = false;
        let requiredProperties = '';

        if (vehicle.type === 'car') { 
            requiredProperties = 'license model latLong miles make'.split(' ');
        } else if (vehicle.type === 'drone') {
            requiredProperties = 'license model latLong airTimeHours base'.split(' '); 
        }
        for (let field of requiredProperties) {
            if(!vehicle[field]) {
                this.errors.push(new DataError(`Invalid field ${field} in ${vehicle.type}`, vehicle));
                hasErrors = true;
            }
        }

        return !hasErrors;
    }

    createCar(car) { 
        try {
            return new Car(car.license, car.model, car.latLong, car.miles, car.make);
        }
        catch(e) { 
            this.errors.push(new DataError('Error loading car', car));
        }
        return null;
        
    }

    createDrone(drone) { 
        try {
            return new Drone(drone.license, drone.model, drone.latLong, drone.airTimeHours, drone.base); 
        }
        catch(e) { 
            this.errors.push(new DataError('Error loading drone', drone))
        }
        return null; 
    }

}