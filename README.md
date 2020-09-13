# rinblog
A blogging app that gives you the freedom to unleash your mind.
**In progress!!**

## Live Demo

[https://rin-blog.web.app/](https://rin-blog.web.app/)

## Features

* Authentication:
  * Users can sign up with email, password, and a unique username
  * Users can login with Google
  * Users cannot create posts without being logged in

* Authorization:
  * Users cannot edit or delete posts that do not belong to them
  * User has a profile page that displays only their posts

* Manage Data
  * Users can create posts that have a title and body
  * Users can edit and delete posts that belong to them

* Other features
  * Can view other users' profiles to see only their posts
  * Long posts are cut off with a "Read more" link to see the full post
  * Let user upload profile pic
  * Persistant state using local storage
  * Responsive web design
    * On desktop, display navigation links in header bar
    * On mobile, links are hidden in a dropdown menu
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
