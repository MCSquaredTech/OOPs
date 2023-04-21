import { Vehicle } from "./vehicle.js";

export class Drone extends Vehicle {

    constructor(license, model, latLong, airTimeHours, base) { 
        super(license, model, latLong);
        this._airTimeHours = airTimeHours; 
        this._base = base; 
    }

    get airTimeHours() { 
        return this._airTimeHours; 
    }

    set airTimeHours(value) { 
        this._airTimeHours = value; 
    }

    get base() { 
        return this._base;
    }

    set base(value) { 
        this._base = value; 
    }
}