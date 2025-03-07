import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const validateObjectId = (req: Request, res: Response, next: NextFunction): void => {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        res.status(400).json({ message: "Invalid task ID format" });
        return; 
    }
    next();
};
