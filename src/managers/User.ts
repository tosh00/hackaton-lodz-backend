import mongoose from "mongoose";
import User, { IUser } from "../model/User";
import * as dotenv from "dotenv";
import { AppError } from "../library/AppError";

dotenv.config();



const createUser = async (props: IUser) => {

    const user = new User({
        _id: new mongoose.Types.ObjectId(),
        ...props
    });


    try {
        return await user.save()
    } catch (err) {
        throw new AppError(500, err as string)
    }
};

const updateUser = async (props: IUser, id: mongoose.Types.ObjectId) => {

    return User.findById(id)
        .then((user) => {
            if (user) {
                user.set(props)
                return user.save()
            }
            else {
                throw new AppError(404, 'User not found')
            }
        })

}

const deleteUser = async (id: mongoose.Types.ObjectId) => {
    try {
        return await User.findOneAndDelete(id)
    } catch (err) {
        throw new AppError(400, err as string)
    }
}


const readUser = async (id: mongoose.Types.ObjectId) => {
    
    const user = await User.findById(id);
    
    if(user != null){
        return user;
    }else{
        throw new AppError(404, 'User not found');
    }
};

const readUsersCC = async (id: mongoose.Types.ObjectId ) => {
    const user = await User.findById(id);
    
    if(user != null){
        return user.cc;
    }else{
        throw new AppError(404, 'User not found');
    }
}

const readUsersHistory = async (id: mongoose.Types.ObjectId ) => {
    const user = await User.findById(id);
    
    if(user != null){
        return user.history;
    }else{
        throw new AppError(404, 'User not found');
    }
}

const readAll = async () => {
    return await User.find();
};
export default {
    createUser,
    readUser,
    readAll,
    updateUser,
    deleteUser,
    readUsersCC,
    readUsersHistory
};
