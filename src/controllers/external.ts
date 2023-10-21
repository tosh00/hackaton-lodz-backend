import { NextFunction, Request, Response } from "express";
import manager from "../managers/User";
import { AppError } from "../library/AppError";

const addCCToUser = async (req: Request, res: Response, next: NextFunction) => {
    const userEmail = req.body.email;
    const cc =  req.body.cc;
    const linkedApp = req.body.app._id;
    console.log('from req', req.body.app._id);
    
    try {
        const added = await manager.addCCToUser(userEmail, cc, linkedApp)
        res.status(200).send(added);
    } catch (err) {
        if (err instanceof AppError) {
            return res.status(err.status).json(err.message)
        } else {
            return res.status(400).json("Unhandled error")
        }
    }
};


export default { addCCToUser}