import {Request, Response} from "express";
const jws = require("jsonwebtoken");

export function isAuthorized(req: Request, res: Response, next: Function) {
    try{
        console.log("auth check")
        const token = req.headers.authorization?.split(" ")[1];
        console.log(token)
        if(!token){
            res.status(401).json({message:"You are unauthorized."})
        }

        const secret: string = process.env.TOKEN_GENERATION_SECRET_KEY as string

        // @ts-ignore
        req.decodedPayload = jws.verify(token, secret)
        return next()
    } catch (e) {
        res.status(401).json({message:"You are unauthorized."})
    }
}