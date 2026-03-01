const forgotPasswordTemplate = ({ name, otp}) => {
    return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">
        <h2 style="color: #333;">Hello ${name},</h2>
        <p style="color: #555; font-size: 16px;">You have requested to reset your password. Please use the following One-Time Password (OTP) to proceed:</p>
        <div style="background-color: #f4f4f4; padding: 10px; border-radius: 5px; text-align: center; margin: 20px 0;">
            <span style="font-size: 24px; font-weight: bold; color: #333;">${otp}</span>
        </div>
        <p style="color: #555; font-size: 16px;">This OTP is valid for the next 15 minutes. If you did not request a password reset, please ignore this email.</p>
        <p style="color: #555; font-size: 16px;">Best regards,<br>Your Company`
}

export default forgotPasswordTemplate;