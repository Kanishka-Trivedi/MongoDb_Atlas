### Task 1: Create a "CodingGita Students" database
```
use CodingGita
```
use this command to create a database.

Now to add simple data to the ```students``` collection we will do the following steps:

```
db.students.insertMany([ { 
    "name": "Kanishka",
    "rollNumber": 073,
    "department": "Artificial Intillegence",
    "year": 1,
    "coursesEnrolled": ["AI101", "AI102"]
  },
  { 
    "name": "Vanshika",
    "rollNumber": 053,
    "department": "Computer Science",
    "year": 1,
    "coursesEnrolled": ["CS101", "CS102"]
  },
  { 
    "name": "Priyasha",
    "rollNumber": 103,
    "department": "Electrical Engineering",
    "year": 3,
    "coursesEnrolled": ["EE101", "EE102"]
  }]);
  ```
Now to add some data in the ```courses``` collection we will do as follows:

```
db.courses.insertMany([  { 
    "courseCode": "AI101", 
    "courseName": "Introduction to Artificial Intelligence", 
    "credits": 5, 
    "instructor": "Prof. Trivedi" 
  },

  { 
    "courseCode": "CS101", 
    "courseName": "Introduction to Programming", 
    "credits": 3, 
    "instructor": "Prof. Jangam" 
  }, 

  { 
    "courseCode": "EE101", 
    "courseName": "Introduction to Electricals", 
    "credits": 3, 
    "instructor": "Prof. Gupta" 
  }]);
  ```

### Task 2: Perform CRUD operations

To add more data to the ```students``` database we will do:
```
db.students.insertOne([  { 
    "courseCode": "EE102", 
    "courseName": "Circuit Theory", 
    "credits": 4, 
    "instructor": "Prof. Yadav" 
  }]);
  ```
  To add more data to the ```courses``` database we will do:
  ```
  db.courses.insertOne([  { 
    "name": "Arjun",
    "rollNumber": 103,
    "department": "Figma Designing",
    "year": 3,
    "coursesEnrolled": ["FD101", "FD102"]
  }]);
  ```
#### Query Data
1.Department (e.g., "Computer Science").
```
db.students.find({"department": "Artificial Intillegence"});
```
this is done to find the name of student in the artificial intelligence field.

2.Year (e.g., "2").
```
db.students.find({"year": 3});
```

3.Courses enrolled (e.g., "CS101").
```
db.students.find({"coursesEnrolled": "CS101"});
```

#### Update the courses for a specific student (e.g., adding a new course).
```
db.students.updateOne(
  { "name": "Priyasha" },
  { $push: { "coursesEnrolled":  "CS102"} }
);
```

#### Delete a student or course from the database.

a. To delete one data from an array we use
```
db.students.deleteOne();
```

b. To delete all the common element from all element we use
```
db.students.deleteMany();
```
EXAMPLE:-
```
db.students.deleteMany({"year": 1});
```
