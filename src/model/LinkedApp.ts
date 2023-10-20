import mongoose, {Schema} from "mongoose";

export interface ILinkedApp{
    name: string,
    logo: string,
    apiKey: string

}
const NgoSchema: Schema = new Schema<ILinkedApp>(
    {
        name: {type: String, required: true, unique: true},
        logo: {type: String, required: true, unique: true},
        apiKey: {type: String, required: true, unique: true},
    }
    ,
    {
        versionKey: false
    }
)

export default mongoose.model<ILinkedApp>('LinkedApp', NgoSchema);
