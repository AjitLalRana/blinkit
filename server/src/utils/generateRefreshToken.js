import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

import UserModel from '../models/user.model.js'

const generateRefreshToken = async (userId) => {
    try {
        const token = jwt.sign(
            { id: userId },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: '7d' }
        )

        await UserModel.findByIdAndUpdate(userId, { refresh_token: token })
        return token;
    } catch (error) {
        throw error;
    }
}

export default generateRefreshToken;