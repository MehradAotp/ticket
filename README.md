
## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ yarn install
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```
## Working with this API
 <b>First Register User in Postman.</b>
http://localhost:3000/users     <mark>POST</mark>
<p>Example : </p>

```json
"username" : "example",
"password" : "password123"
```
after register you can login and get token jwt
http://localhost:3000/auth/login    <mark>POST</mark>
<p>Example : </p>

```json
"username" : "example",
"password" : "password123"
```
and get example token : <br>
```json
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1laHJhZDMiLCJpYXQiOjE3Mjc5MDA2MTIsImV4cCI6MTcyNzkwNDIxMn0.gaVp4qIXZsjk0gW2-gdyrybIRnufSP0F4tobmjWl-Do"
```
<hr>
 <b>event(example cinema Or ...)</b><br>
create event.
http://localhost:3000/events   <mark>POST</mark>
<p>Example Data : </p>

```json
"title": "Joker",
  "description": "Live TV ",
  "date": "2024-10-15T19:30:00Z",
  "location": "Stadium A",
  "price": 836
  ``` 
  and update data 
  http://localhost:3000/events   <mark>PATCH</mark>
  <p>Example Data : </p>

```json
"title": "Mokhtar",
  "description": "Live Tv.",
  "date": "2024-10-15T19:30:00Z",
  "location": "Stadium A",
  "price": 50
  ```
  get all event and event by id
  http://localhost:3000/events    <mark>GET</mark><br>
  For all Data Send Empty Data . but for get by id Send eventId In Param
  <p>Example : </p>
http://localhost:3000/events/66fd15ae3802e4409738f01e  <mark>GET</mark>

And you can delete the event like get by id but use delete instead of get
<p>Example : </p>
http://localhost:3000/events/66fd15ae3802e4409738f01e <mark>DELETE</mark>
<hr>
<b>Ticket</b><br>
like events but different Route
Create Ticket.
http://localhost:3000/tickets   <mark>POST</mark>

```json
"username" : "mmd",
    "eventId" :"66fd3408fa864887efce0b5d",
    "quantity" : 6
```
All Ticket AND Get Ticket By ID  In Param    <mark>GET</mark>
and Delete Ticket By Id In Param      <mark>DELETE</mark>

## Authentication
After logging in, you will get a token. and expire in 1h<br>
Now you have to put that token in the <mark>Authorization</mark> tab of the <mark>Bearer Token</mark> type<br>
Example Jwt : <br>
```json
  "access_token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1laHJhZDMiLCJpYXQiOjE3Mjc5MDA2MTIsImV4cCI6MTcyNzkwNDIxMn0.gaVp4qIXZsjk0gW2-gdyrybIRnufSP0F4tobmjWl-Do"
```

## License

[MIT licensed](https://github.com/MehradAotp/ticket/blob/master/LICENSE).
