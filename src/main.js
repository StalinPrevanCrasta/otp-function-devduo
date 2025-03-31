const sdk = require('node-appwrite');

module.exports = async function(req, res) {
    const client = new sdk.Client();
    
    // Initialize Mail service
    const mail = new sdk.Mail(client);

    client
        .setEndpoint('https://cloud.appwrite.io/v1')
        .setProject(process.env.APPWRITE_FUNCTION_PROJECT_ID)
        .setKey(process.env.APPWRITE_FUNCTION_API_KEY);

    try {
        const { email, otp } = JSON.parse(req.payload);

        // Send email
        await mail.send(
            email,
            'Your DevDuo Verification Code',
            `Your verification code is: ${otp}\nThis code will expire in 10 minutes.`,
            `<h1>Your DevDuo Verification Code</h1>
             <p>Your verification code is: <strong>${otp}</strong></p>
             <p>This code will expire in 10 minutes.</p>`
        );

        return res.json({
            success: true,
            message: 'OTP sent successfully'
        });
    } catch (error) {
        console.error('Failed to send OTP:', error);
        return res.json({
            success: false,
            message: error.message
        });
    }
};