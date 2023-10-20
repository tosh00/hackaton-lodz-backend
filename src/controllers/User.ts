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
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const user = await manager.readUsersCC(userId)
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
        const userId = new mongoose.Types.ObjectId(req.params.id);
        const user = await manager.readUsersHistory(userId)
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



export default { createUser, readUser, readAll, updateUser, deleteUser, readUserCC, readUsersHistory }