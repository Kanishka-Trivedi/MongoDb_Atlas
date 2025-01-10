const express = require('express');
const { MongoClient, ObjectId } = require('mongodb'); // Import ObjectId for MongoDB _id handling

const app = express();
const port = 3000;

// MongoDB connection details
const uri = "mongodb://127.0.0.1:27017";
const dbName = "codinggita";

// Middleware
app.use(express.json());

let db, courses;

// Connect to MongoDB and initialize collections
async function initializeDatabase() {
    try {
        const client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        db = client.db(dbName);
        courses = db.collection("courses");

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

// GET: List all courses or fetch a specific course by id
app.get('/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const course = await courses.findOne({ _id: new ObjectId(id) });
        if (course) {
            res.status(200).json(course);
        } else {
            res.status(404).send(`Course with ID ${id} not found`);
        }
    } catch (err) {
        res.status(500).send("Error fetching course: " + err.message);
    }
});

// POST: Add a new course
app.post('/courses', async (req, res) => {
    try {
        const newCourse = req.body;
        const result = await courses.insertOne(newCourse);
        res.status(201).send(`Course added with ID: ${result.insertedId}`);
    } catch (err) {
        res.status(500).send("Error adding course: " + err.message);
    }
});

// PUT: Update a course completely by id
app.put('/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedCourse = req.body;
        const result = await courses.replaceOne({ _id: new ObjectId(id) }, updatedCourse);
        if (result.matchedCount > 0) {
            res.status(200).send(`${result.modifiedCount} document(s) updated`);
        } else {
            res.status(404).send(`Course with ID ${id} not found`);
        }
    } catch (err) {
        res.status(500).send("Error updating course: " + err.message);
    }
});

// PATCH: Partially update a course by id
app.patch('/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updates = req.body;
        const result = await courses.updateOne({ _id: new ObjectId(id) }, { $set: updates });
        if (result.matchedCount > 0) {
            res.status(200).send(`${result.modifiedCount} document(s) updated`);
        } else {
            res.status(404).send(`Course with ID ${id} not found`);
        }
    } catch (err) {
        res.status(500).send("Error partially updating course: " + err.message);
    }
});

// DELETE: Remove a course by id
app.delete('/courses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const result = await courses.deleteOne({ _id: new ObjectId(id) });
        if (result.deletedCount > 0) {
            res.status(200).send(`Course with ID ${id} deleted`);
        } else {
            res.status(404).send(`Course with ID ${id} not found`);
        }
    } catch (err) {
        res.status(500).send("Error deleting course: " + err.message);
    }
});
