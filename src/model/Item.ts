import mongoose, {Schema} from "mongoose";

export interface IItem{
    value?: string,

}
const NgoSchema: Schema = new Schema<IItem>(
    {
        value: {type: String, required: false, unique: true},
    }
    ,
    {
        versionKey: false
    }
)

export default mongoose.model<IItem>('Item', NgoSchema);
