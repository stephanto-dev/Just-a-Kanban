
![Logo of the project](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/logo_just_a_kanban.png)


## Just a Kanban
This is a simple (but fullstack) Kanban project where you can organize your projects in a simple and efficient way!


## Technology 

Here are the technologies used in this project.

* Express
* NodeJs
* Typescript
* SQLite3
* React
* Sass

## Services Used

* Render (for backend)
* Vercel (for frontend)

## Getting started

* You have to open two command prompts: one for the backend and one for the frontend

* To create and build your database accord of the project, run this command on backend prompt
  - npm run typeorm -- -d ./src/database/data-source.ts migration:run
  
 - On both prompts, run these commands:
	* To install the dependencies.
	  - npm install --force
	  
	* To run the project.
	  - npm run dev

## How to use

### 1 - When you access, you will see the Login page. You can login on your account or create one clicking on "register"

![Login page image](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/Login.png)
![Register page image](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/Register.png)

### 2 - You will be on main page, where you can start creating your cards.

![Main Page](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/Main%20Page.png)

### 3 - You can create, delete and change the status or the text of your cards

![Cards Show](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/New%20Card.png)
![Cards Show](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/Change%20status.png)

### 4 - And after all you can have a Kanban just like this one:
![Kanban example](https://github.com/stephanto-dev/Just-a-Kanban/blob/main/readme/Full%20Example.png)

## Features

The main features of the application are:
 - Register yorself
 - Login in your account
 - Create cards
 - Move cards
 - Update cards
 - Delete cards


## Links
  - Deploy on Vercel (If when you try to use the site for the first time it takes a long time to respond or is very slow, it is because of the hosting. The server is turned off when it is inactive, so when you make the first request it will turn on): https://just-a-kanban.vercel.app/
  - Repository: https://github.com/stephanto-dev/Just-a-Kanban
  - Figma: https://www.figma.com/file/KPuyONmwGDifWVnPiBNjYS/Projeto?type=design&node-id=0%3A1&mode=design&t=oNzs19m3vfHdGnFg-1

  ## Versioning

  1.0.0.0

  ## Future implementations

  * Change the server communication to socket
  * Implement a card editor
  * Implement shared kanban with other users


  ## Authors

  * **Vinicius Stephanto Oliveira** 
