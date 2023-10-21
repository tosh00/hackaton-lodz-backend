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

    if (user != null) {
        return user;
    } else {
        throw new AppError(404, 'User not found');
    }
};

const readUsersCC = async (email: string) => {
    const user = await User.findOne({ email });

    if (user != null) {
        return user.cc;
    } else {
        throw new AppError(404, 'User not found');
    }
}

const readUsersHistory = async (email: string) => {
    console.log('test');
    const user = await User.findOne({ email }).populate({ 
        path: 'history',
        populate: {
          path: 'linkedApp',
          model: 'LinkedApp',
          select: '-apiKey'
        } 
     });
    

    if (user != null) {
        return user;
    } else {
        throw new AppError(404, 'User not found');
    }
}

const checkIfUserExist = async (email: string) => {
    return !!(await User.findOne({ email }));
}

const readAll = async () => {
    return await User.find();
};

const addCCToUser = async (email: string, cc: number, linkedApp: mongoose.Types.ObjectId) => {
    
    const user = await User.findOne({ email });
    console.log(email);
    
    try {

        if (!linkedApp) {
            throw new AppError(403, 'Staph! You violated the law!')
        }

        if (user) {

            const newHistoryReccord = {
                linkedApp,
                cc,
                date: (new Date()).toString()
            }

            user.history.push(newHistoryReccord)
            user.cc += cc;
            user.save()
            return newHistoryReccord;
        } else {
            throw new AppError(500, 'Internal server error')
        }
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        } else {
            throw new AppError(500, 'Internal server error2')
        }
    }
}

const spendCC = async (email: string, solutionName: string) => {
    const user = await User.findOne({ email });
    try {

        if (!solutionName) {
            throw new AppError(400, 'Please provide solution name')
        }

        if (user) {

            if (user.cc <= 0) {
                throw new AppError(400, 'You don\'t have any CC to spend')
            }

            user.spentCC.push({
                solutionName: solutionName,
                cc: user.cc
            })
            user.cc = 0;
            user.save()
        } else {
            throw new AppError(500, 'Internal server error')
        }
    } catch (err) {
        if (err instanceof AppError) {
            throw err;
        } else {
            throw new AppError(500, 'Internal server error2')
        }
    }
}

const CCBySolution = async (email: string, solutionName: string) => {
    const user = await User.findOne({ email });
    try {
        if (user) {
            return user.spentCC.reduce((accumulator, currentValue) => {
                if (currentValue.solutionName === solutionName) {
                    return accumulator += currentValue.cc;
                } else {
                    return accumulator;
                }
            }, 0)
        } else {
            throw new AppError(500, 'Internal server error')
        }
    } catch (err) {
        throw new AppError(500, 'Internal server error')
    }
}

export default {
    createUser,
    readUser,
    readAll,
    updateUser,
    deleteUser,
    readUsersCC,
    readUsersHistory,
    checkIfUserExist,
    spendCC,
    CCBySolution,
    addCCToUser
};
