# MongoDB Tasks
### Task 1: Add more students to the students collection

- Add at least 5 new students to the students collection with unique names, roll numbers, and course enrollments.

```
use cg
db.createCollection("students");

db.students.insertMany(
  [{
    "name": "Priyasha",
    "rollNumber": "CS1003",
    "coursesEnrolled": ["CS101", "CS102", "MATH101"],
    "department": "CSE"
},
  { 
    "name": "Arjun",
    "rollNumber": "CS100",
    "coursesEnrolled": ["EE101", "EE102"]
  },
  {
    "name":"Dhruvesh",
    "rollNumber" : "CS1004",
    "coursesEnrolled": ["CS101", "CS102"],
    "department": "CSE"

}
,
  { 
    "name": "Jenil",
    "rollNumber": "CS101",
    "coursesEnrolled": [
    "CS103","MATH101"
  ]
  },
  { 
    "name": “Kanishka”,
    "rollNumber": "CS1002",
    "coursesEnrolled": ["CS101", "CS103","MATH101"],
    "department": "CSE"

  },
   {
    "name": "Yashvi",
    "rollNumber": "CS110",
    "coursesEnrolled": [
    "CS101", "CS103"
  ]
  },

   {
    "name": "Mahir",
    "rollNumber": "CS111",
    "coursesEnrolled": ["CS101", "CS103","MATH101"]
  
  }
  ]
)

```

```
db.createCollection("courses");
db.courses.insertMany(
  [
  { 
    "courseCode": "CS101", 
    "courseName": "Introduction to Programming", 
    "credits": 3, 
    "instructor": "Prof. Sharma" 
  },
  { 
    "courseCode": "CS102", 
    "courseName": "Data Structures", 
    "credits": 3, 
    "instructor": "Prof. Gupta" 
  },
  { 
    "courseCode": "CS103", 
    "courseName": "Algorithms", 
    "credits": 3, 
    "instructor": "Prof. Kapoor" 
  },
  { 
    "courseCode": "EE101", 
    "courseName": "Basic Electrical Engineering", 
    "credits": 4, 
    "instructor": "Prof. Verma" 
  },
  { 
    "courseCode": "EE102", 
    "courseName": "Circuit Theory", 
    "credits": 4, 
    "instructor": "Prof. Yadav" 
  },
    {
    "courseCode" : "MATH101",
    "courseName" : "Mathematics",
   "credits": 4,
   "instructor": "Prof. Parmar"
   },
   {
    "courseCode" : "EE103",
    "courseName" : "Digital Electronics" ,
    "credits" : 2,


   }
]);

```
### Task 2: Insert a new course into the courses collection

-   Add a new course with the following details:   
    Course Code: CS202   
    Name: Data Structures   
    Credits: 3    
    Instructor: Prof. Krishna


```
db.courses.insertOne({ 
    "courseCode": "CS202", 
    "courseName": "Data Structures", 
    "credits": 3, 
    "instructor": "Prof. Krishna" 
  })
  ```


#### *Task 3: Fetch a specific student's record by roll number*  
- Use find() to fetch a student's information using their roll number (CS1002).
```
db.students.find({"rollNumber": "CS1002"});
```

#### *Task 4: Query all students who are enrolled in a particular course*  
- Retrieve all students who are enrolled in "MATH101".
```
db.students.find({"coursesEnrolled": "MATH101"});
```

#### *Task 5: Update a student's courses*  
- Update the student with roll number CS1001 to enroll in an additional course "CS202".
```
db.students.updateOne(
  { "rollNumber": "CS1001" },
  { $push: { "coursesEnrolled": "CS202" } }
);
```

#### *Task 6: Remove a course from a student's courses list*  
- Remove the course MATH101 from the student Mahir's list of enrolled courses.
```
db.students.updateOne({"name":"Mahir"}, 
{ $pull: { "coursesEnrolled": "MATH101" } })
```


#### *Task 7: Find all courses with 3 credits*  
- Query the courses collection to find all courses where the credits field equals 3.
```
db.courses.find({ "credits": 3 })
```

#### *Task 8: Find students who have enrolled in more than 2 courses*  
- Use $size operator to query students who are enrolled in more than 2 courses.

```
db.students.aggregate([
  {
    $project: {
      name: 1,
      coursesCount: { $size: "$coursesEnrolled" }
    }
  },
  {
    $match: {
      coursesCount: { $gt: 2 }
    }
  }
]);
```

#### *Task 9: Use the $in operator to find students enrolled in multiple courses*  
- Use the $in operator to find students who are enrolled in either CS101 or MATH202.
```
db.students.find({
  "coursesEnrolled": { $in: ["CS101", "MATH202"] }
});
```

#### *Task 10: Fetch all students from a specific department (e.g., CSE)*  
- Use a query to find all students in the CSE department.
```
db.students.find({"department":"CSE"});
```

#### *Task 11: Query students who are in their 3rd year*  
- Retrieve students who are in the 3rd year using the year field.
```
db.students.find({"year":3});
```

#### *Task 12: Query students using a range for their year*  
- Find all students who are in 2nd or 3rd year by using the $gte operator.
```
db.students.aggregate([
  {
    $match: {
      "year": { $gte: 2, $lte: 3 }
    }
  }
]);
```

#### *Task 13: Count the total number of students in each department*  
- Use the $group stage of aggregation to group students by department and count them.
```
db.students.aggregate([
  {
    $group: {
      _id: "$department",      
      totalStudents: { $sum: 1 }  
    }
  }
]);
```


#### *Task 14: Group courses by credits*  
- Group courses by their credit value and count how many courses there are for each credit value.
```
db.courses.aggregate([
  {
    $group: {
      _id: "$credits",         
      coursesCount: { $sum: 1 } 
    }
  }
]);
```


#### *Task 15: Find the highest credit course*  
- Query for the course with the highest number of credits using the $sort operator.
```
db.courses.aggregate([
  { $sort: { "credits": -1 } },  
  { $limit: 1 }                 
]);
```


#### *Task 16: Use the $and operator for filtering students*  
- Find all students who belong to the CSE department and are enrolled in more than 2 courses.
```
db.students.find({
  $and: [
    { "department": "CSE" },
    { $expr: { $gt: [{ $size: "$coursesEnrolled" }, 2] } }
  ]
});
```


#### *Task 17: Add a new field to all documents in the students collection*  
- Add a new field activeStatus and set it to true for all students.
```
db.students.updateMany(
  {},
  { $set: { "activeStatus": true } }
);
```


#### *Task 18: Use $rename to rename a field*  
- Rename the coursesEnrolled field in the students collection to enrolledCourses.
```
db.students.updateMany(
  {},
  { $rename: { "coursesEnrolled": "enrolledCourses" } }
);
```


#### *Task 19: Set default values for new fields in all student documents*  
- Add a field graduationYear with a default value for all students.
```
db.students.updateMany({},{$set: {"graduationYear": 2025}});
```

#### *Task 20: Use the $push operator to add a new course to a student’s course list*  
- Add the course "CS303" to Mahir’s coursesEnrolled list.
```
db.students.updateOne({"name":"Mahir"}, {$push:{"coursesEnrolled":"CS303"}});
```

#### *Task 21: Use $pull to remove a course from a student's courses list*  
- Remove the course CS101 from Jenil’s list.
```
db.students.updateOne({"name":"Jenil"}, {$pull: {"coursesEnrolled": "CS101"}})
```

#### *Task 22: Remove a student from the students collection*  
- Delete the student record with roll number CS1004.
```
db.students.deleteOne({"rollNumber":"CS1004"});
```

#### *Task 23: Find students who are enrolled in both CS101 and MATH202*  
- Use $all operator to find students who are enrolled in both courses.
```
db.students.find({
  "coursesEnrolled": { $all: ["CS101", "MATH202"] }
});
```


#### *Task 24: Use $regex to search for students whose name starts with "A"*  
- Use regular expressions to search for students whose names begin with the letter "A".
```
db.students.find({
  "name": { $regex: "^A", $options: "i" }
});
```

#### *Task 25: Use $exists to find students with enrolled courses*  
- Query students who have an entry in the coursesEnrolled array.
```
db.students.find({
  "coursesEnrolled": { $exists: true, $ne: [] }
});
```

#### *Task 26: Add a field to store students' grades for each course*  
- Add a new field grades to the students collection and store an array of grades for each course.
```
db.students.updateMany(
  {},
  { $set: { "grades": [] } }
);
```

#### *Task 27: Use $elemMatch to query students enrolled in specific courses*  
- Find students enrolled in CS101 and have the grade A.
```
db.students.find({
  "coursesEnrolled": { $elemMatch: { "course": "CS101", "grade": "A" } }
});
```


#### *Task 28: Use $size operator to query students with exactly 2 courses enrolled*  
- Query students who have enrolled in exactly two courses.
```
db.students.find({
  "coursesEnrolled": { $size: 2 }
});
```

#### *Task 29: Perform a text search for a course title*  
- Use text indexing to search for the course Digital Electronics in the courses collection.
```
db.courses.createIndex({ "courseName": "text" });
db.courses.find({ $text: { $search: "Digital Electronics" } });
db.courses.find({ $text: { $search: "Digital Electronics" } })
  .hint({ "courseName": "text" });
  ```


#### *Task 30: Create a compound index on department and year*  
- Create a compound index on the fields department and year for better querying performance.
```
db.students.createIndex({ "department": 1, "year": 1 });
```

#### *Task 31: Use $sort to order students by their roll number*  
- Sort the students in ascending order of their roll number.
```
db.students.find().sort({ "rollNumber": 1 });
```

#### *Task 32: Create a unique index on the roll number*  
- Create a unique index to ensure that the roll numbers in the students collection are unique.
```
db.students.createIndex({ "rollNumber": 1 }, { unique: true });
```

#### *Task 33: Update the course name in the courses collection*  
- Update the name of the course CS101 to Intro to Programming.
```
db.courses.updateOne(
  { "courseCode": "CS101" },
  { $set: { "courseName": "Intro to Programming" } }
);
```

#### *Task 34: Create a backup of the CodingGitaStudents database*  
- Use mongodump to back up the entire CodingGitaStudents database.
```
mongodump --db cg --out /path/to/backup
mongodump --db cg --out /home/user/backup
```

#### *Task 35: Restore the CodingGitaStudents database from the backup*  
- Use mongorestore to restore the database after a backup.
```
mongorestore --db cg /path/to/backup/cg
mongorestore --db cg /home/user/backup/cg
```


#### *Task 36: Use $project to reshape data in aggregation*  
- Project only the name and department of students using an aggregation query.
```
db.students.aggregate([
  {
    $project: { 
      "name": 1, 
      "department": 1 
    }
  }
]);
```

#### *Task 37: Use $unwind to deconstruct the courses array*  
- Use $unwind to split the coursesEnrolled array into individual documents.
```
db.students.aggregate([
  {
    $unwind: "$coursesEnrolled"
  }
]);
```


#### *Task 38: Use $limit to retrieve only the first 3 students*  
- Use $limit to limit the result to the first 3 students in the students collection.
```
db.students.aggregate([
  { 
    $limit: 3 
  }
]);
```


#### *Task 39: Use $skip to skip the first 2 students and get the rest*  
- Use $skip to fetch all students except the first two.
```
db.students.aggregate([
  { 
    $skip: 2 
  }
]);
```

#### *Task 40: Use $lookup to join student data with courses*  
- Use $lookup to fetch the course information for students.
```
db.students.aggregate([
  {
    $lookup: {
      from: "courses",
      localField: "coursesEnrolled",
      foreignField: "courseCode",
      as: "courseDetails"
    }
  }
]);
```

#### *Task 41: Create a new collection for storing studentFeedback*  
- Create a collection studentFeedback with fields: studentRollNumber, feedbackText, date.
```
db.studentFeedback.insertMany(
  [
{
  "studentRollNumber": "CS101",
  "feedbackText" : "Teachers are friendly and Classmates are supportive",
  "date": new Date()
   }
,
  { 
   "studentRollNumber": "CS100",
   "feedbackText" : "Teachers are supportive and Classmates are friendly",
  "date": new Date()
  }
])
```

#### *Task 42: Query the studentFeedback collection to find feedback from a specific student*  
- Use find() to retrieve feedback from Jenil.
```
db.studentFeedback.find({"studentRollNumber":"CS101"}, {"feedbackText": 1, "date": 1, "_id": 0});
```

#### *Task 43: Use $set to update multiple fields at once*  
- Use the $set operator to update the department and coursesEnrolled fields for Arjun.
```
db.students.updateOne({"name": "Arjun"}, {$set: {"department": "Computer Science", "coursesEnrolled" : ["CS101", "CS102" , "MATH101" ]}})
```


#### *Task 44: Create a custom index on the coursesEnrolled field*  
- Create an index on the coursesEnrolled array for faster querying.
```
db.students.createIndex({
  "coursesEnrolled" : 1
});
```

#### *Task 45: Perform a query on nested documents in students collection*  
- Query for students who have grades A in their courses.
```
db.students.find(
  { "coursesEnrolled.grade": "A" }  
);
```