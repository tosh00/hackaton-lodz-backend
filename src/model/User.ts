import mongoose, {Schema} from "mongoose";

export interface IHistory{
    linkedApp?: mongoose.Types.ObjectId,
    cc: number,
    date: string
}

export interface ISpentCC{
    solutionName: string,
    cc: number
}
export interface IUser{
    email: string,
    cc: number,
    history: IHistory[],
    spentCC: ISpentCC[]

}
const NgoSchema: Schema = new Schema<IUser>(
    {
        email: {type: String, required: true, unique: true},
        cc: {type: Number, required: true, default: 0},
        history: [{
            linkedApp: {type: Schema.Types.ObjectId, required: true, ref: 'LinkedApp'},
            cc: {type: Number, required: true},
            date: {type: String, required: true}
        }],
        spentCC: [
            {
                solutionName: {type: String, require: true},
                cc: {type: Number, require: true}
            }
        ]
    },
    {
        versionKey: false
    }
)

export default mongoose.model<IUser>('User', NgoSchema);
