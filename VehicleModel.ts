import {Model} from "objection";
import {PersonModel} from "./PersonModel";

export class VehicleModel extends Model{
    
    public id : number;
    public model: string;
    public person_id: number;

    static get tableName() {
        return 'vehicle';
    }
    
    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            person: {
                relation: Model.BelongsToOneRelation,
                modelClass: PersonModel,
                join : {
                    from: "vehicle.person_id",
                    to: "persons.id"
                }
            }
        }
    }

}

//export default PersonModel;