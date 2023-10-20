import { OAuth2Client, TokenPayload } from "google-auth-library"
import { Request, Response, NextFunction } from "express";
import User from "../model/User"
import userManager from "../managers/User"
import dotenv from 'dotenv'

dotenv.config();

async function validateAssertion(assertion: any, oAuth2Client: OAuth2Client) {
  if (!assertion) {
    return {};
  }

  // Check that the assertion's audience matches ours
  // const aud = await audience();
  const aud = '168441896086-1u2jequdkfnffl9htp2ev5j3h29b1h4s.apps.googleusercontent.com';

  // Fetch the current certificates and verify the signature on the assertion
  const response = await oAuth2Client.getIapPublicKeys();
  const ticket = await oAuth2Client.verifyIdToken({
    idToken: assertion,
    audience: aud
  });
  const payload = ticket.getPayload();

  // Return the two relevant pieces of information
  if (payload) {
    return {
      email: payload.email,
      sub: payload.sub,
    };
  }
}

const userAuthenticate = async (req: Request, res: Response, next: NextFunction) => {
  const oAuth2Client = new OAuth2Client();
  const assertion = req.header('session-token');

  

  if (!assertion) {
    res.status(401).send();
  }

  try {
    const info = await validateAssertion(assertion, oAuth2Client);
    if (info && info.email) {

      if(!(await userManager.checkIfUserExist(info.email))){
        await userManager.createUser({email: info.email, cc: 0, history: [], spentCC: []})
      }
      req.body.user = info;
      next();
    } else {
      res.status(401).send();
    }
  } catch (err) {
    res.status(401).send(err);
  }


}


export default userAuthenticate 