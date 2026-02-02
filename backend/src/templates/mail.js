function mailTemplate(username, email, password){
    return `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #eaeaea;">
            <h2 style="color: #333;">Welcome, ${username} 👋</h2>

            <p>Your account has been <strong>successfully created</strong> by the administrator.</p>

            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px;">
                <p><strong>Login Details:</strong></p>
                <p>Email: <strong>${email}</strong></p>
                <p>Password: <strong>${password}</strong></p>
            </div>

            <p style="margin-top: 15px;">
                👉 Please login and <strong>change your password</strong> immediately for security reasons.
            </p>

            <p style="margin-top: 20px; font-size: 12px; color: #777;">
                If you did not expect this email, please contact the administrator.
            </p>

            <p style="margin-top: 10px;">
                Regards,<br/>
                <strong>Team Aman Mishra Company</strong>
            </p>
        </div>

    `;
};
module.exports = mailTemplate;
