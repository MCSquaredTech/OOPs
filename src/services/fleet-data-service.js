
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
                    if(this.validateCarData(data));{
                        let car = this.loadCar(data);
                        if(car) {
                            this.cars.push(car);
                        }
                    }
                    
                    break;
                case 'drone': 
                    if (this.validateDroneData(data)) { 
                        let drone = this.loadDrone(data);
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

    loadCar(car) { 
        try {
            let c = new Car(car.license, car.model, car.latLong);
            c.miles = car.miles;
            c.make = car.make;
            return c;
        }
        catch(e) { 
            this.errors.push(new DataError('Error loading car', car));
        }
        return null;
        
    }

    validateCarData(car) { 
        let requiredProps = 'license model latLong miles make'.split(' '); 
        let hasErrors = false; 

        for (let field of requiredProps) { 
            if (!car[field]) {
                this.errors.push(new DataError(`Invalid field ${field} in car data`, car));
                hasErrors = true; 
            }
        }
        return !hasErrors;
    }

    loadDrone(drone) { 
        try {
            let d = new Drone(drone.license, drone.model, drone.latLong); 
            d.airTimeHours = drone.airTimeHours;
            d.base = drone.base;
            return d;
        }
        catch(e) { 
            this.errors.push(new DataError('Error loading drone', drone))
        }
        return null; 
    }

    validateDroneData(drone) { 
        let requiredProps = 'license model latLong airTimeHours base'.split(' '); 
        let hasErrors = false; 

        for (let field of requiredProps) { 
            if (!drone[field]) {
                this.errors.push(new DataError(`Invalid field ${field} in drone data`, drone));
                hasErrors = true; 
            }
        }
        return !hasErrors;
    }
}