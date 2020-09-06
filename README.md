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
  * Can view other users' profiles that displays only their posts
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

* Let user edit their username/email/password
* Let user delete their account
* Let user upload profile pic (if none, give them a default pic)
   * Display pic on each post and on profile
* Let users 'like' each others posts (maybe)
* When user logs in with Google for the first time, have them make a username
