const verifyEmailTemplate = ({name, url}) => {
    return `<h1>Welcome to Blinkit, ${name}!</h1>
    <p>Thank you for registering with us. Please click the link below to verify your email address:</p>
    <a href="${url}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verify Email</a>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Best regards,<br/>The Blinkit Team</p>`
}

export default verifyEmailTemplate;