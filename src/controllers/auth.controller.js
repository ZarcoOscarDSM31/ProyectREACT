import User from "../models/user.model.js";
import bcrypt from 'bcryptjs';
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";

/* R E G I S T E R */
export const register = async (req, res) => {
    const { email, password, username } = req.body;

    try {
        const userFound = await User.findOne({ email });
        if (userFound) return res.status(400).json(["El usuario ya está registrado"]);

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            username,
            email,
            password: passwordHash,
        });

        const userSaved = await newUser.save();
        const token = await createAccessToken({ id: userSaved._id });
        res.cookie('token', token);
        res.json({
            id: userSaved._id,
            username: userSaved.username,
            email: userSaved.email,
            createAt: userSaved.createdAt,
            updatedAt: userSaved.updatedAt,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json(["Error interno del servidor"]);
        console.error("Error en el servidor durante el registro:", error);
    }
};


/* L O G I N */
export const login = async(req, res) => {
    const {email, password } = req.body;
    
    try {
        const UserFound = await User.findOne({ email });
        if(!UserFound ) return res.status(400).json({ message: "Usuario no encontrado" });

        const isMatch = await bcrypt.compare(password, UserFound.password); //comparar la contraseña 

        if(!isMatch) return res.status(400).json({ message: "Contraseña incorrecta" });

        const token = await createAccessToken({id: UserFound._id})
        
        res.cookie('token', token);
        res.json({ //Mostrar en el front solo lo que seleccioné
            id: UserFound._id,
            username: UserFound.username,
            email: UserFound.email,
            createAt: UserFound.createdAt,
            updatedAt: UserFound.updatedAt,
        });


    } catch (error) {
        console.log(error)
    }
};

/* L O G O U T */
export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0),
    });
    return res.sendStatus(200);
};

/* P R O F I L E */
export const profile = async(req, res ) => {
    const UserFound = await User.findById(req.user.id);
    if(!UserFound) return res.status(400).json({ message: "Usuario no encontrado" });
    
    return res.json({
        id: UserFound._id,
        username:UserFound.username,
        email: UserFound.email,
        createAt: UserFound.createAt,
        updatedAt: UserFound.updatedAt
    });

}

/* V E R I F Y  T O K E N */
export const verifyToken = async(req, res) => {
    const { token } = req.cookies;
    if(!token) return res.status(401).json({ message: "Autorización denegada"});

    jwt.verify(token, process.env.TOKEN_SECRET, async(err, user) => {
        if(err) return res.status(401).json({ message: "Token invalido"});
        
        const userFound = await User.findById(user.id);
        if(!userFound) return res.status(401).json({ message: "Usuario no encontrado" });

        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
        });
    });
};