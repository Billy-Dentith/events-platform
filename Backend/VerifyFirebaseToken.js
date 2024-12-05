require("dotenv").config();
const admin = require("firebase-admin");

if (!process.env.GOOGLE_APPLICATION_CREDENTIALS) {
  throw new Error("Google Application Credentials are not set");
}

const serviceAccount = require(process.env.GOOGLE_APPLICATION_CREDENTIALS);

const config = {
  credential: admin.credential.cert(serviceAccount),
};

const firebase = admin.apps.length ? admin.app() : admin.initializeApp(config);

const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split("Bearer ")[1];

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);

    req.user = {
      uid: decodedToken.uid,
    };    

    next();
  } catch (error) {
    console.error("Error verifying token: ", error);
    res.status(401).send("Invalid token");
  }
};

module.exports = verifyFirebaseToken;
