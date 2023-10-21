import mongoose from "mongoose";
import LinkedApp, { ILinkedApp } from "../model/LinkedApp";
import * as dotenv from "dotenv";
import { AppError } from "../library/AppError";

dotenv.config();



const createLinkedApp = async (props: ILinkedApp) => {

    const linkedApp = new LinkedApp({
        _id: new mongoose.Types.ObjectId(),
        ...props
    });


    try {
        return await linkedApp.save()
    } catch (err) {
        throw new AppError(500, err as string)
    }
};

const updateLinkedApp = async (props: ILinkedApp, id: mongoose.Types.ObjectId) => {

    return LinkedApp.findById(id)
        .then((linkedApp) => {
            if (linkedApp) {
                linkedApp.set(props)
                return linkedApp.save()
            }
            else {
                throw new AppError(404, 'LinkedApp not found')
            }
        })

}

const deleteLinkedApp = async (id: mongoose.Types.ObjectId) => {
    try {
        return await LinkedApp.findOneAndDelete(id)
    } catch (err) {
        throw new AppError(400, err as string)
    }
}


const readLinkedApp = async (id: mongoose.Types.ObjectId) => {

    const linkedApp = await LinkedApp.findById(id);

    if (linkedApp != null) {
        return linkedApp;
    } else {
        throw new AppError(404, 'LinkedApp not found');
    }
};

const readLinkedAppByApiKey = async (apiKey: string) => {
    
    const linkedApp = await LinkedApp.findOne({ apiKey });
    
    if (linkedApp != null) {
        return linkedApp;
    } else {
        throw new AppError(404, 'LinkedApp not found');
    }
};


const readAll = async () => {
    return await LinkedApp.find();
};

export default {
    createLinkedApp,
    readLinkedApp,
    readAll,
    updateLinkedApp,
    deleteLinkedApp,
    readLinkedAppByApiKey
};
