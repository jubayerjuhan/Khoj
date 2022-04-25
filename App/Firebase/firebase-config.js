
const admin = require("firebase-admin");

const serviceAccount = require("./khoj-12258-firebase-adminsdk-ed3a7-a2a8909ab7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


module.exports = admin