import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import manager from "../managers/LinkedApp";
import { AppError } from "../library/AppError";

const createLinkedApp = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newLinkedApp = await manager.createLinkedApp(req.body)
        res.status(201).send(newLinkedApp);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};
const readLinkedApp = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const linkedAppId = new mongoose.Types.ObjectId(req.params.id);
        const linkedApp = await manager.readLinkedApp(linkedAppId)
        return res.status(200).json(linkedApp);

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

const updateLinkedApp = async (req: Request, res: Response, next: NextFunction) => {
    const linkedAppId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const newLinkedApp = await manager.updateLinkedApp(req.body, linkedAppId)
        res.status(200).json(newLinkedApp);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }

};
const deleteLinkedApp = async (req: Request, res: Response, next: NextFunction) => {
    const linkedAppId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const deleted = await manager.deleteLinkedApp(linkedAppId);
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

export default { createLinkedApp, readLinkedApp, readAll, updateLinkedApp, deleteLinkedApp }