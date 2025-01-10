const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3008;

// MongoDB connection details
// const uri = "mongodb://127.0.0.1:27017"; 
const uri = "mongodb+srv://test1:kanishka123@cluster0.2lxux.mongodb.net/"
const dbName = "codinggita";

// Middleware
app.use(express.json());

let db, students;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        students = db.collection("students");

        // Start server after successful DB connection
        app.listen(port, () => {
            console.log(`Server running at http://localhost:${port}`);
        });
    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
        process.exit(1); // Exit if database connection fails
    }
}

// Initialize Database
initializeDatabase();

// Routes

// GET: List all students
app.get('/students', async (req, res) => {
    try {
        const allstudents = await students.find().toArray();
        res.status(400).json(allstudents);
    } catch (err) {
        res.status(500).send("Error fetching students: " + err.message);
    }
});

// POST: Add a new student
app.post('/students', async (req, res) => {
    try {
        const newStudent = req.body;
        const result = await students.insertOne(newStudent);
        res.status(201).send(`Student added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding student: " + err.message);
    }
});

// PUT: Update a student completely
app.put('/students/:rollNumber', async (req, res) => {
    try {
        console.log("Request Params: ", req.params);
        console.log("Request Body: ", req.body);
        const rollNumber = parseInt(req.params.rollNumber);
        const updatedStudent = req.body;
        const result = await students.replaceOne({ rollNumber }, updatedStudent);
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error updating student: " + err.message);
    }
});

// PATCH: Partially update a student
app.patch('/students/:rollNumber', async (req, res) => {
    try {
        const rollNumber = parseInt(req.params.rollNumber);
        const updates = req.body;
        const result = await students.updateOne({ rollNumber }, { $set: updates });
        res.status(200).send(`${result.modifiedCount} document(s) updated`);
    } catch (err) {
        res.status(500).send("Error partially updating student: " + err.message);
    }
});

// DELETE: Remove a student
app.delete('/students/:name', async (req, res) => {
    try {
        const name = (req.params.name);
        const result = await students.deleteOne({ name });
        res.status(200).send(`${result.deletedCount} document(s) deleted`);
    } catch (err) {
        res.status(500).send("Error deleting student: " + err.message);
    }
});


// const express = require('express');
// const { MongoClient } = require('mongodb');

// const app = express();
// const port = 3008;

// // MongoDB connection details
// // const uri = "mongodb://127.0.0.1:27017"; 
// const uri = "mongodb+srv://test1:kanishka123@cluster0.2lxux.mongodb.net/"
// const dbName = "sample_mflix";

// // Middleware
// app.use(express.json());

// let db, students;

// // Connect to MongoDB and initialize collections
// async function initializeDatabase() {
//     try {
//         const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
//         console.log("Connected to MongoDB");

//         db = client.db(dbName);
//         students = db.collection("students");

//         // Start server after successful DB connection
//         app.listen(port, () => {
//             console.log(`Server running at http://localhost:${port}`);
//         });
//     } catch (err) {
//         console.error("Error connecting to MongoDB:", err);
//         process.exit(1); // Exit if database connection fails
//     }
// }

// // Initialize Database
// initializeDatabase();

// // Routes

// // GET: List all students
// app.get('/students', async (req, res) => {
//     try {
//         const allstudents = await students.find().toArray();
//         res.status(400).json(allstudents);
//     } catch (err) {
//         res.status(500).send("Error fetching students: " + err.message);
//     }
// });

// // POST: Add a new student
// app.post('/students', async (req, res) => {
//     try {
//         const newStudent = req.body;
//         const result = await students.insertOne(newStudent);
//         res.status(201).send(`Student added with ID: ${result.insertedId}`);
//     } catch (err) {
//         res.status(500).send("Error adding student: " + err.message);
//     }
// });

// // PUT: Update a student completely
// app.put('/students/:rollNumber', async (req, res) => {
//     try {
//         console.log("Request Params: ", req.params);
//         console.log("Request Body: ", req.body);
//         const rollNumber = parseInt(req.params.rollNumber);
//         const updatedStudent = req.body;
//         const result = await students.replaceOne({ rollNumber }, updatedStudent);
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error updating student: " + err.message);
//     }
// });

// // PATCH: Partially update a student
// app.patch('/students/:rollNumber', async (req, res) => {
//     try {
//         const rollNumber = parseInt(req.params.rollNumber);
//         const updates = req.body;
//         const result = await students.updateOne({ rollNumber }, { $set: updates });
//         res.status(200).send(`${result.modifiedCount} document(s) updated`);
//     } catch (err) {
//         res.status(500).send("Error partially updating student: " + err.message);
//     }
// });

// // DELETE: Remove a student
// app.delete('/students/:name', async (req, res) => {
//     try {
//         const name = (req.params.name);
//         const result = await students.deleteOne({ name });
//         res.status(200).send(`${result.deletedCount} document(s) deleted`);
//     } catch (err) {
//         res.status(500).send("Error deleting student: " + err.message);
//     }
// });