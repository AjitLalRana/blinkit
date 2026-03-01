import jwt from 'jsonwebtoken'


const authMiddleware = async(req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken || req.header?.authorization?.split(' ')[1];
        if(!accessToken){
            return res.status(401).json({
                message: "Unauthorized",
                error: true,
                success: false
            })
        }
        const decoded = jwt.verify(accessToken, process.env.JWT_ACCESS_SECRET);
        req.userId = decoded.id;
        next();
    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired token",
            error: true,
            success: false
        })
    }
}

export default authMiddleware;