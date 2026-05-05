# CSC337FinalProject Specs
Web Programming Project: Multi-Module Web Application
<p>  

Recipe World <br>
<p> This is a Node.js web application built using Express and MongoDB that simulates a real-world recipe blogging platform. </p> 
Follow the steps below to install dependencies and run the project. <br>
Install required packages: <br>

```
npm install express 
npm install express-session
npm install bcrypt 
npm install mongoose 
```

Start the server: <br>
```
node server/server.js
The application will run at http://localhost:8080/
```
To load demo recipes while the server is running:
```
node server/demoRecipes.js 
```

## Project Sturcture

```
CSC337FinalProject/
├── server/
│ ├── routes/
│ │ ├── recipes.js
│ │ ├── user.js
│ │ ├── comments.js
│ │ ├── recipe.js
│ │ ├── userRoutes.js
│ │ └── favorites.js
│ ├── comments.json
│ ├── demoRecipes.js
│ └── server.js
│
├── public/
│ ├── css/
│ │ ├── recipes.css
│ │ ├── recipe.css
│ │ ├── recipeform.css
│ │ ├── users.css
│ │ ├── comments.css
│ │ ├── login.css
│ │ └── register.css
│ │
│ ├── js/
│ │ ├── recipes.js
│ │ ├── recipe.js
│ │ ├── comments.js
│ │ ├── form.js
│ │ ├── edit-recipe.js
│ │ └── users.js
│ │
│ ├── recipes.html
│ ├── recipe.html
│ ├── create-recipe.html
│ ├── edit-recipe.html
│ ├── login.html
│ ├── home.html
│ ├── comments.html
│ └── register.html
├── .gitignore
├── report.pdf
├── Project Description.pdf
└── README.md
```
