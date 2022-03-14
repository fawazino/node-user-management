#Node user management api


http://localhost:3000/signup

to create new user

{
 "firstname": "your first name",
 "lastname": "your last name",
 "email": "your email",
 "password": "your password",
  "birthday": "your birthday",
  "image" : "your image file/link"
}


http://localhost:3000/delete/:id

to delete user


http://localhost:3000/editUser/:id

to update user profile

{
 "firstname": "your name"
 "birthday": "your firstname"
}

http://localhost:3000/login

to login

{
 "email": "your email"
 "password": "your password"
}

http://localhost:3000/login
to logout

http://localhost:3000/user/:id 

to view user profile

