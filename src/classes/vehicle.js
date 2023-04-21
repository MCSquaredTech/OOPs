export class Vehicle { 

    constructor(license, model, latLong) { 
        this._license = license; 
        this._model = model;
        this._latLong = latLong;
    }

    get license() { 
        return this._id;
    }

    get model() { 
        return this._name;
    }

    get latLong() { 
        return this._latLong;
    }
}