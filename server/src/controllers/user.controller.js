import UserModel from '../models/user.model.js'
import bcrypt from 'bcryptjs'
import  sendEmail  from '../config/sendEmail.js';
import  verifyEmailTemplate  from '../utils/verifyEmailTemplate.js';
import generateAccessToken from '../utils/generateAccessToken.js';
import generateRefreshToken from '../utils/generateRefreshToken.js';
import { uploadAvatarToCloudinary } from '../utils/uploadToCloudinary.js';
import generateotp from '../utils/generateOtp.js';
import forgotPasswordTemplate from '../utils/forgotPasswordTemplate.js';



const registerUser = async (req, res) => {
    try {
        const { name, password, email } = req.body
        if(!name || !email || !password){
            return res.status(400).json({
                message: "Name, email and password are required",
                error: true,
                success: false
            })
        }

        const existingUser = await UserModel.findOne({ email })

        if(existingUser){
            return res.status(409).json({
                message: "User with this email already exists",
                error: true,
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const payload = {
            name,
            email,
            password: hashedPassword
        }

        const newUser = new UserModel(payload)

        const user = await newUser.save()

        const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${user._id}`

        const verifyEmail = await sendEmail({
            to: email,
            subject: "Welcome to Blinkit",
            html: verifyEmailTemplate({name, url: verifyEmailUrl})
        })

        return res.json({
            message: "User registered successfully",
            error: false,
            success: true,
        })


    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const verifyEmail = async (req, res) => {
    try {
        const userId = req.query.code;
        if(!userId){
            return res.status(400).json({
                message: "Verification code is required",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findById(userId);
        if(!user){
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        if(user.verify_email === false){
            user.verify_email = true;
            await user.save();
            return res.json({
                message: "Email verified successfully",
                error: false,
                success: true
            })  
        }
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(400).json({
                message: "Email and password are required",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "User not found",
                error: true,
                success: false
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(401).json({
                message: "Invalid password",
                error: true,
                success: false
            })
        }
        if(user.status !== "Active"){
            return res.status(403).json({
                message: `User account is ${user.status}. Please contact to administrator.`,
                error: true,    
                success: false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id);
        user.last_login_date = new Date();
        await user.save();



        
        res.cookie('accessToken', accessToken, {
            httpOnly: true,
            secure : true,
            sameSite : 'None',

        })
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure : true,
            sameSite : 'None',
            
        })
        user.password = undefined;
        user.refresh_token = undefined;
        return res.status(200).json({
            message: "User logged in successfully",
            error: false,
            success: true,
            data: user
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const logoutUser = async (req, res) => {
    try {
        const userId = req.userId;
        await UserModel.findByIdAndUpdate(userId, {refresh_token: null})
        res.clearCookie('accessToken',{
            httpOnly: true,
            secure : true,
            sameSite : 'None',
        });
        res.clearCookie('refreshToken',{
            httpOnly: true,
            secure : true,
            sameSite : 'None',  
        });

        return res.status(200).json({
            message: "User logged out successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const uploadAvatar = async (req, res) => {
  try {
    
    const result = await uploadAvatarToCloudinary(req.file?.buffer);
    await UserModel.findByIdAndUpdate(req.userId, { avatar: result.secure_url });
    return res.status(200).json({
      message: "Avatar uploaded",
      url: result.secure_url,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const updateUserDetails = async (req, res) => {
    try {
        const userId = req.userId;
        const {name, email, mobile, password} = req.body;
        if(!name && !email && !mobile && !password){
            return res.status(400).json({
                message: "At least one field (name, email, mobile, password) is required",
                error: true,
                success: false
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

       const updateUser = await UserModel.findByIdAndUpdate(userId,{
            ...(name && {name}),
            ...(email && {email}),
            ...(mobile && {mobile}),
            ...(password && {password: hashedPassword})
       },{new: true})

        return res.status(200).json({
            message: "User details updated successfully",
            error: false,
            success: true,
            data: updateUser
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const forgotPassword = async (req, res) =>{
    try {
        const {email} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({
                message: "Email does not match with our records",
                error: true,
                success: false
            })
        }

        const otp = generateotp();
        const otpExpiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

        user.forgot_password_otp = otp;
        user.forgot_password_expiry = new Date(otpExpiry);
        await user.save();
        await sendEmail({
            to: email,
            subject: "Password Reset OTP",
            html: forgotPasswordTemplate({name: user.name, otp})
        })
        return res.status(200).json({
            message: "OTP sent to email",
            error: false,
            success: true
        })  
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const resetPassword = async (req, res) =>{
    try {
        const {email, otp, newPassword} = req.body;
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(400).json({   
                message: "Email does not match with our records",
                error: true,
                success: false
            })
        }
        if(user.forgot_password_otp !== otp || user.forgot_password_expiry < Date.now()){
            return res.status(400).json({
                message: "Invalid or expired OTP",  
                error: true,
                success: false
            })
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.forgot_password_otp = null;
        user.forgot_password_expiry = null;
        await user.save();
        return res.status(200).json({
            message: "Password reset successfully",
            error: false,
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

const verifyOTP = async(req, res) => {
    try {
        const {email,otp} = req.body
        const user = await UserModel.findOne({email});
        if(!user){
            return res.status(404).json({
                message: "Email is not registered",
                error: true,
                success: false
            })
        }
        if(user.forgot_password_otp === otp){
            return res.status(200).json({
                message: "OTP verified",
                error: false,
                success: true
            })
        }
        
    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}



export {
    registerUser,
    verifyEmail,
    loginUser,
    logoutUser,
    uploadAvatar,
    updateUserDetails,
    forgotPassword,
    resetPassword,
    verifyOTP
}