// Install this package in your Azure Function: npm install @fluidframework/azure-client jsonwebtoken
const { InsecureTokenProvider } = require("@fluidframework/azure-client");
const jwt = require("jsonwebtoken");

// These values should be stored securely as Environment Variables in your Azure Function App
const TENANT_ID = process.env.AZURE_FLUID_RELAY_TENANT_ID;
const TENANT_KEY = process.env.AZURE_FLUID_RELAY_TENANT_KEY;

module.exports = async function (context, req) {
    const { userId, userName } = req.body;

    if (!userId || !userName) {
        context.res = {
            status: 400,
            body: "Please provide a userId and userName in the request body."
        };
        return;
    }
    
    // Create a JSON Web Token (JWT) for the user
    const token = jwt.sign(
        {
            tenantId: TENANT_ID,
            user: {
                id: userId,
                name: userName,
            },
            scopes: ["doc:read", "doc:write", "summary:write"],
        },
        TENANT_KEY,
        {
            expiresIn: "1h", // The token should be short-lived for security
        }
    );

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: { token }
    };
};