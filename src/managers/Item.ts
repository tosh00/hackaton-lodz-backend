import mongoose from "mongoose";
import Item, { IItem } from "../model/Item";
import * as dotenv from "dotenv";
import { AppError } from "../library/AppError";

dotenv.config();



const createItem = async (props: IItem) => {

    const item = new Item({
        _id: new mongoose.Types.ObjectId(),
        ...props
    });


    try {
        return await item.save()
    } catch (err) {
        throw new AppError(500, err as string)
    }
};

const updateItem = async (props: IItem, id: mongoose.Types.ObjectId) => {

    return Item.findById(id)
        .then((item) => {
            if (item) {
                item.set(props)
                return item.save()
            }
            else {
                throw new AppError(404, 'Item not found')
            }
        })

}

const deleteItem = async (id: mongoose.Types.ObjectId) => {
    try {
        return await Item.findOneAndDelete(id)
    } catch (err) {
        throw new AppError(400, err as string)
    }
}


const readItem = async (id: mongoose.Types.ObjectId) => {
    
    const item = await Item.findById(id);
    
    if(item != null){
        return item;
    }else{
        throw new AppError(404, 'Item not found');
    }
};

const readAll = async () => {
    return await Item.find();
};

export default {
    createItem,
    readItem,
    readAll,
    updateItem,
    deleteItem
};
