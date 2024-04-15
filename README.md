# rinblog
A blogging app that gives you the freedom to unleash your mind.
**In progress!!**

<img width="1512" alt="Screenshot 2024-04-15 at 12 16 09 PM (2)" src="https://github.com/sharonrgomez/rinblog/assets/22580495/fa683bfb-98ef-4f89-9c24-947c1e26e10d">

## Live Demo

[https://rinblog.sharongomez.com/](https://rinblog.sharongomez.com/)

## Features

* Authentication:
  * Users can sign up with email, password, and a unique username
  * Users can login with Google
  * Users cannot create posts without being logged in

* Authorization:
  * Users cannot edit or delete posts that do not belong to them
  * User has a profile page that displays only their posts

* Manage Data
  * Users can create posts that have a title and body (can also insert images)
  * Users can edit and delete posts that belong to them

* Other features
  * Can view other users' profiles to see only their posts
  * Long posts are cut off with a "Read more" link to see the full post
  * Let user upload profile pic
  * Persistant state using local storage
  * Responsive web design
  * Accessibility
  
## Built with

* React
* React Router
* Redux
* Firebase Real-time Database
* Firebase Authentication
* SemanticUI
* SCSS

## Features to add

* Let user edit their email/password
* Let user delete their account
* Let users 'like' each others posts
