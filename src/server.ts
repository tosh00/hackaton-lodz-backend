import { OAuth2Client, TokenPayload } from "google-auth-library"
import express from "express";
import {isAvailable, project} from "gcp-metadata";
import dotenv from 'dotenv'
import { assert } from "console";

dotenv.config()
const app = express();
const oAuth2Client = new OAuth2Client();

// Cache externally fetched information for future invocations
let aud: any;


async function audience() {
    if (!aud && (await isAvailable())) {
        let project_number = await project('numeric-project-id');
        let project_id = await project('project-id');

        aud = '/projects/' + project_number + '/apps/' + project_id;
    }

    return aud;
}

async function validateAssertion(assertion: any) {
    if (!assertion) {
        return {};
    }

    // Check that the assertion's audience matches ours
    const aud = await audience();

    // Fetch the current certificates and verify the signature on the assertion
    const response = await oAuth2Client.getIapPublicKeys();
    const ticket = await oAuth2Client.verifySignedJwtWithCertsAsync(
        assertion,
        response.pubkeys,
        aud,
        ['https://cloud.google.com/iap']
    );
    const payload = ticket.getPayload();

    // Return the two relevant pieces of information
    if (payload) {
        return {
            email: payload.email,
            sub: payload.sub,
        };
    }
}

app.get('/', async (req, res) => {
    const assertion = req.header('X-Goog-IAP-JWT-Assertion');
    let email = 'None';
    try {
        const info = await validateAssertion(assertion);
        if(info?.email)
        email = info.email;
    } catch (error) {
        console.log(error);
    }
    res.status(200).send(`Hello ${email}`).end();
});


// Start the server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
    console.log('Press Ctrl+C to quit.');
});