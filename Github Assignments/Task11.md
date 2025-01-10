### *Practice Assignment:*

*1. Additional Questions on CRUD Operations:*

- Insert new students into the "students" collection with random data.
```
db.students.insertMany(
  [
  {
"name":"Priyasha",
"rollNumber" : 103,
"department" : "Computer Science",
"year":4,
"coursesEnrolled": ["CS101", "CS102", "MATH101"]
},

{
"name":"Vanshika",
"rollNumber" : 100,
"department" : "Computer Science",
"year":1,
"coursesEnrolled": ["CS103", "CS102"]
},
{
"name":"Krish",
"rollNumber" : 101,
"department" : "Computer Science",
"year":1,
"coursesEnrolled": ["CS102", "CS104"]

},

{
"name":"Priy",
"rollNumber" : 102,
"department" : "Computer Science",
"year": 2,
"coursesEnrolled": ["CS103", "CS104"]
  
}
,
{
"name":"Dhruvesh",
"rollNumber" : 104,
"department" : "Computer Science",
"year": 3,
"coursesEnrolled": ["CS101", "CS102"]},

{
"name":"Kanishka",
"rollNumber" : 106,
"department" : "Computer Science",
"year":1,
"coursesEnrolled": ["CS101", "CS105"]

},

{ 
"name": "Arjun",
"rollNumber": 1002,
"department": "Electrical Engineering",
"year":2,
"coursesEnrolled": ["EE101", "EE102", "MATH101"]
  }
])
```

- Update the department of a student based on their roll number.
```
db.students.updateOne(
  { "rollNumber": 103 },
  { $set: { "department": "Electrical Engineering" } }
);
```

- Remove all students who have enrolled in less than 3 courses.
```
db.students.deleteMany({
  $expr: { $lt: [{ $size: "$coursesEnrolled" }, 3] }
});
```


*2. Aggregation Exercise:*

- Use aggregation to find the department with the most number of students.
```
db.students.aggregate([
  { $group: { _id: "$department", studentCount: { $sum: 1 } } },
  { $sort: { studentCount: -1 } },
  { $limit: 1 }
]);
```


*3. Advanced Querying Exercise:*

- Query students who have enrolled in a specific set of courses (e.g., CS101 and MATH101).

```
db.students.find({
  "coursesEnrolled": { $all: ["CS101", "MATH101"] }
});
```

*4. Indexing and Performance:*

- Experiment with creating indexes on various fields like department, year, etc., and measure the query performance using explain().

```
db.students.createIndex({ "department": 1 });
db.students.createIndex({ "year": 1 });
db.students.createIndex({ "department": 1, "year": 1 });
db.students.createIndex({ "coursesEnrolled": 1 });

db.students.find({ "department": "Computer Science" }).explain("executionStats");
db.students.find({ "department": "Computer Science" }).explain("executionStats");
db.students.find({ "department": "Computer Science", "year": 1 }).explain("executionStats");
db.students.find({ "coursesEnrolled": { $all: ["CS101", "MATH101"] } }).explain("executionStats");

```