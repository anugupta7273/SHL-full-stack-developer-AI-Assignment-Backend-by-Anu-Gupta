// // The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
// const {logger} = require("firebase-functions");
// const express=require('express');
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
// const app = express();


// // The Firebase Admin SDK to access Firestore.


// initializeApp();
// app.use(
//      cors({
//        origin: '*',
//        preflightContinue: true,
//      }),
//    );

// exports.getProjects = onRequest(async (req, res) => {
//     const projectSnapshotRef = await getFirestore().collection("projects").get();
//     var projectsData = [];
//     if(!projectSnapshotRef.empty){
//          projectsData = projectSnapshotRef.docs.map((project) => project.data());
//     }
//    res.json({result: `Projects Get successfully`, project : projectsData , flag : true});
// });

const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const functions = require('firebase-functions');
const {onRequest} = require("firebase-functions/v2/https");

admin.initializeApp();

const app = express();

// Allow all origins with CORS middleware
app.use(cors());

app.get('/getProjects', async (req, res) => {
  try {
    const projectSnapshotRef = await admin.firestore().collection('projects').get();
    const projectsData = [];

    if (!projectSnapshotRef.empty) {
      projectSnapshotRef.forEach((project) => {
        projectsData.push(project.data());
      });
    }

    res.json({ result: 'Projects fetched successfully', projects: projectsData, flag: true });
  } catch (error) {
    console.error('Error fetching projects:', error);
    res.status(500).json({ result: 'Internal Server Error', flag: false });
  }
});

// Create a Firebase function from the Express app

exports.getProjects = onRequest(app);
