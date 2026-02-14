import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { initDB } from '../config/db';

const SECRET_KEY = process.env.JWT_SECRET || 'bdec_secret_key_2026';

export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    try {
        const db = await initDB();
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (existingUser) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await db.run(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        const newUser = await db.get('SELECT id, name, email, role FROM users WHERE id = ?', [result.lastID]);

        const token = jwt.sign(
            { id: newUser.id, email: newUser.email, role: newUser.role, name: newUser.name },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            token,
            user: newUser
        });
    } catch (error) {
        console.error('Register error:', error);
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
        const db = await initDB();
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: 'Credenciales inválidas' });
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error en el servidor', error });
    }
};

import { OAuth2Client } from 'google-auth-library';

const client = new OAuth2Client("379610858519-9rar2evofp4mff5k1pa9viqq49jdvemc.apps.googleusercontent.com");

export const googleLogin = async (req: Request, res: Response) => {
    const { idToken, isImplicit, email: impEmail, name: impName } = req.body;

    try {
        let email, name;

        if (isImplicit) {
            email = impEmail;
            name = impName;
        } else {
            const ticket = await client.verifyIdToken({
                idToken,
                audience: "379610858519-9rar2evofp4mff5k1pa9viqq49jdvemc.apps.googleusercontent.com",
            });

            const payload = ticket.getPayload();
            if (!payload) {
                return res.status(400).json({ message: 'Token de Google no válido' });
            }
            email = payload.email;
            name = payload.name;
        }

        const db = await initDB();
        // Check if user exists or create one
        let user = await db.get('SELECT * FROM users WHERE email = ?', [email]);

        if (!user) {
            const randomPass = await bcrypt.hash(Math.random().toString(36), 10);
            await db.run(
                'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
                [name, email, randomPass, 'user']
            );
            user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        }

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role, name: user.name },
            SECRET_KEY,
            { expiresIn: '24h' }
        );

        res.json({
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Google Auth Error:', error);
        res.status(500).json({ message: 'Error en la autenticación con Google', error });
    }
};

export const getMe = async (req: any, res: Response) => {
    res.json({ user: req.user });
};
