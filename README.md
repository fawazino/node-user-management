# Node user management api

## Usage

```javascript
http://localhost:3000/signup
to create new user

{ "firstname": "your first name", 
"lastname": "your last name",
 "email": "your email", 
 "password": "your password", 
 "birthday": "your birthday", 
 "image" : "your image file/link" }
 ```

```javascript
http://localhost:3000/delete/:id
to delete user
```

```javascript
http://localhost:3000/editUser/:id
to update user profile

{ "firstname": "your name",
"birthday": "your firstname" }
```

```javascript
http://localhost:3000/login
to login user

{ "email": "your email",
 "password": "your password" }
```

```javascript
http://localhost:3000/login 
to logout
```

```javascript
http://localhost:3000/user/:id
to view user profile
```
# node-user-management

