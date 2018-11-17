import {PersonModel} from "./PersonModel";
import {VehicleModel} from "./VehicleModel";

export const insertPeople = async() =>{
    const initialPerson = await PersonModel.query().insert({
        firstName: "Utkarsh",
        parent_id: null
    });
    await PersonModel.query().insert({
        firstName: "Utkarsh",
        parent_id: initialPerson.id
    });
}

export const insertVehicle = async() =>{
    const vehicle = await VehicleModel.query().insert({
        model: "BMW",
        person_id: 1
    });
    await VehicleModel.query().insert({
        model: "Lamborghini",
        person_id: 2
    });
}