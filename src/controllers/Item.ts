import { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";
import manager from "../managers/Item";
import { AppError } from "../library/AppError";

const createItem = async (req: Request, res: Response, next: NextFunction) => {

    try {
        const newItem = await manager.createItem(req.body)
        res.status(201).send(newItem);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};
const readItem = async (req: Request, res: Response, next: NextFunction) => {
    
    try {
        const itemId = new mongoose.Types.ObjectId(req.params.id);
        const item = await manager.readItem(itemId)
        return res.status(200).json(item);

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

const updateItem = async (req: Request, res: Response, next: NextFunction) => {
    const itemId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const newItem = await manager.updateItem(req.body, itemId)
        res.status(200).json(newItem);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }

};
const deleteItem = async (req: Request, res: Response, next: NextFunction) => {
    const itemId = new mongoose.Types.ObjectId(req.params.id);

    try {
        const deleted = await manager.deleteItem(itemId);
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

export default { createItem, readItem, readAll, updateItem, deleteItem}