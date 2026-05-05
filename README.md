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
├── server/              # Main server, routes and backend
│ ├── routes/            # routes
│ │ ├── recipes.js       # backend for recipes
│ │ ├── comments.js      # backend for comments
│ │ ├── userRoutes.js    # backend for user
│ │ └── favorites.js     # backed for favoriting
│ ├── models/            # contains mongoDB structures
│ │ ├── user.js          # mongoDB user structure
│ │ └── recipe.js        # mongoDB recipe structure
│ ├── comments.json      # storage for comments
│ ├── demoRecipes.js     # file to load recipes
│ └── server.js          # server to run
│
├── public/              # front end
│ ├── css/               # css styling
│ │ ├── recipes.css      # styling for recipes.html
│ │ ├── recipe.css       # styling for recipe.html
│ │ ├── recipeform.css   # styling for create-recipe.html
│ │ ├── users.css        # styling for home.html
│ │ ├── comments.css     # styling for comments.html
│ │ ├── login.css        # styling for login.html
│ │ └── register.css     # styling for register.html
│ │
│ ├── js/                # javascript files
│ │ ├── recipes.js       # javascript for recipes.html
│ │ ├── recipe.js        # javascript for recipe.html
│ │ ├── comments.js      # javascript for comments.html
│ │ ├── form.js          # javascript for create-recipe.html
│ │ ├── edit-recipe.js   # javascript for edit-recipe.html
│ │ └── users.js         # javascript for login,register and home html files
│ │
│ ├── recipes.html       # webpage for browsing recipes
│ ├── recipe.html        # webpage for single recipes
│ ├── create-recipe.html # webpage for add recipes
│ ├── edit-recipe.html   # webpage for editing recipes
│ ├── login.html         # webpage for user login
│ ├── home.html          # webpage for home
│ ├── comments.html      # webpage for viewing/adding/deleting comments
│ └── register.html      # webpage for user registering
├── .gitignore           # ignore for github
├── report.pdf           # Report for project
├── Project Description.pdf # project specs
└── README.md            # README file containing a description of the project
```
