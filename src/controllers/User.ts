import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import manager from "../managers/User";
import { AppError } from "../library/AppError";

const createUser = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newUser = await manager.createUser(req.body)
        res.status(201).send(newUser);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};
const readUser = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const user = await manager.readUser(userId)
        return res.status(200).json(user);

    }
    catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(500).json("Unhandled error")
        }
    }

};

const readUserCC = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        // const userId = new mongoose.Types.ObjectId(req.params.id);
        const userEmail = req.body.user.email;

        const user = await manager.readUsersCC(userEmail)
        return res.status(200).json(user);

    }
    catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(500).json("Unhandled error")
        }
    }

};

const readUsersHistory = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const userEmail = req.body.user.email;
        console.log(userEmail);
        const user = await manager.readUsersHistory(userEmail)
        
        return res.status(200).json(user);

    }
    catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(500).json("Unhandled error")
        }
    }

};

const readAll = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const all = await manager.readAll()
        
        return res.status(200).json(all);
    }
    catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};

const updateUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const newUser = await manager.updateUser(req.body, userId)
        res.status(200).json(newUser);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }

};
const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
    const userId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const deleted = await manager.deleteUser(userId);
        return res.status(200).json(deleted);
    }
    catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};

const spendCC = async (req: Request, res: Response, next: NextFunction) => {
    const solutionName = req.body.solutionName;

    try {
        const newUser = await manager.spendCC(req.body.user.email, solutionName)
        res.status(200).json(newUser);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }

};

const CCBySolution = async (req: Request, res: Response, next: NextFunction) => {
    const solutionName = req.query.solutionName;

    try {
        const sum = await manager.CCBySolution(req.body.user.email, solutionName as string)
        res.status(200).json({solutionName, cc: sum});
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};


export default { createUser, readUser, readAll, updateUser, deleteUser, readUserCC, readUsersHistory, spendCC, CCBySolution}