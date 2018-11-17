import {Model} from "objection";
import {VehicleModel} from "./VehicleModel";

export class PersonModel extends Model{
    
    public id : number;
    public parent_id: number;
    public firstName: string;

    static get tableName() {
        return 'persons';
    }
    
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            vehicle: {
                relation: Model.HasManyRelation,
                modelClass: VehicleModel,
                join : {
                    from: "persons.id",
                    to: "vehicle.person_id"
                }
            }
        }
    }

}

//export default PersonModel;