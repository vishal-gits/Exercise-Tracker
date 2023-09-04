### Project Description - Build a Exercise Tracker

It is a Exercise Tracker Logger

1. You can enter username, it will give a JSON output of username and a corresponding Id.
2. With the Id, you can enter, all the exercise details, it will add the exercise details to the user corresponding to the Id , and will give a Json output of the same.
3. You can give a api call with id and logs, it will give the particular user's logs of all exercises.
4. You can give a api call with id/users, it will give a list of all users

### Project Live Link : https://exercise-tracker-1.vishal-gits.repl.co/

Output JSON to have the following structure

```
Exercise:

{
username: "fcc_test",
description: "test",
duration: 60,
date: "Mon Jan 01 1990",
_id: "5fb5853f734231456ccb3b05"
}

User:

{
username: "fcc_test",
_id: "5fb5853f734231456ccb3b05"
}

Log:

{
username: "fcc_test",
count: 1,
_id: "5fb5853f734231456ccb3b05",
log: [{
description: "test",
duration: 60,
date: "Mon Jan 01 1990",
}]
}
```

### This is a certification project of "FCC Back End Development and APIs"

on "Free Code Camp" https://www.freecodecamp.org/

The Requirements of the project are stated in the below link

https://www.freecodecamp.org/learn/back-end-development-and-apis/back-end-development-and-apis-projects/exercise-tracker

### A full stack Javascript app built using NodeJS,Express and MongoDB and Mongoose for database.
