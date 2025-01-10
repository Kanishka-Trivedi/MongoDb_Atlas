## Task 1: Add multiple students
Insert at least 5 students into the students collection with unique roll numbers, names, departments, years, and subjects enrolled.

```
db.students.insertMany([
  { 
    "name": "Priyasha",
    "rollNumber": 102,
    "department": "Computer Science",
    "year": 2,
    "subjectsEnrolled": ["React", "NodeJS", "MongoDB"]
  },
  { 
    "name": "Dristi",
    "rollNumber": 103,
    "department": "Computer Science",
    "year": 2,
    "subjectsEnrolled": ["React", "NodeJS"]
  },
  { 
    "name": "Dhruvesh",
    "rollNumber": 104,
    "department": "Electrical Engineering",
    "year": 3,
    "subjectsEnrolled": ["Circuit Theory", "Electrical Machines"]
  },
  { 
    "name": "Krish",
    "rollNumber": 105,
    "department": "Electrical Engineering",
    "year": 4,
    "subjectsEnrolled": ["Circuit Theory", "Electrical Machines"]
  },
  { 
    "name": "Vanshika",
    "rollNumber": 106,
    "department": "Maschine Learning",
    "year": 3,
    "subjectsEnrolled": ["Natural Language Processing", "Electrical Machines"]
  }
]);
```

## Task 2: Add multiple subjects
Insert 4 subjects into the ```subjects``` collection, each with 3 to 5 topics.
```
db.subjects.insertMany([
  { 
    "subjectName": "React",
    "topics": [
      "JSX", 
      "Components", 
      "State", 
      "Props", 
      "Hooks"
    ]
  },
  { 
    "subjectName": "NodeJS", 
    "topics": [
      "Modules", 
      "Express", 
      "File System", 
      "Asynchronous Programming",
    ]
  },
  { 
    "subjectName": "MongoDB", 
    "topics": [
      "Database Design", 
      "CRUD Operations", 
      "Aggregation", 
      "Indexes"
    ]
  },
  { 
    "subjectName": "Javascript", 
    "topics": [
      "Functions", 
      "Operators", 
      "Objects", 
      "Array",
      "DOM"
    ]
  }
]);
```

## Task 3: Query students based on subject enrollment
Query the ```students``` collection to find all students who are enrolled in NodeJS.