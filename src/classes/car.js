import { Vehicle } from "./vehicle.js";

export class Car extends Vehicle { 

    constructor (license, model, latLong, miles, make) {
        super(license, model, latLong); 
        this._miles = miles; 
        this._make = make;
    }

    get miles() { 
        return this._miles;
    }

    set miles(value) {
        this._miles = value;
    }

    get make() { 
        return this._make;
    }

    set make(value) { 
        this._make = value; 
    }
}