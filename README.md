# MARVEL Front-end _ ReactJS

Project of Marvel library using data from Json hosted by Le Reacteur training center's API requests are sent to this API via my own back-end Routes (see this link for back-end repo ==> https://github.com/Vincent-Saillard/Marvel-API)
See full project online via this link ==> https://marvel-library-23.netlify.app/

## Description

This project contains

* Header on top, position fixed. Contains a logo (link to Homepage), searchbar (displayed only on Character's and Comic's pages), a navigation (to Characters, Comics, Favorites) and a burger menu for small screens to display nav and searchbar)
* Home page with animated title and Register/Connection buttons, forms appear on modal. After signup or login a token is added in Cookies lasting 15 days, this token is deleted when user clicks on Disconnect button.
* Characters page displaying by default 100 first results. If pictures are not given by API they are replaced automaticaly. Page options are located at the bottom of the page allowing to choose between 10 to 100 results by page (step of 10) and the page number. Clicking on a character picture will lead you to the CharacterAlone page.
  * CharacterAlone page shows the character user clicked on, with picture, name, description (if existing), the list of comics where he apprears in a carousel and the possibility to add the character in Favorites ONLY for connected users (if not connected a message is displayed inviting user to connect on homepage).
* Comics page displaying by default 100 first results. If pictures are not given by API they are replaced automaticaly. Page options are located at the bottom of the page allowing to choose between 10 to 100 results by page (step of 10) and the page number. Clicking on a comic picture will lead you to the ComicALone page.
  * ComicAlone page shows the comic user clicked on, with picture, title, description (if existing), and the possibility to add the comic in Favorites ONLY for connected users (if not connected a message is displayed inviting user to connect on homepage).
* Favs page only accessible for connected users. Non connected user will be sent back to homepage with the Register modal opened, (if user already has an account he can directly click on "already member" to have the Login modal). Favs page displays all favs (picture and name/title) and the option to remove from fav list.
* Footer with links to my Github and linkedin pages

All responsive.
Project is hosted on Netlify fot front-end.
Back-end is done and hosted on Northflank.

## Getting Started

If you want to test it on your local server, install needed dependencies and use "yarn dev" command.

### Dependencies

* react-js
* react-router-dom
* axios
* js-cookie

### Functionalities

* BIG SCREENS
 
  * HOMEPAGE
    
![homepage-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/88939512-64a5-4d22-8a4e-6223f9cf135d)

  * REGISTER MODAL

![register-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/b4a4b71c-f04c-4da9-ad16-de39efa255e6)

  * LOGIN MODAL

![login-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/ef38d688-cf7d-42c9-ad2d-0e464afd9592)

  * CHARACTERS PAGE

![characters-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/1806df7b-a32c-4c8f-815b-a3ac87034d1e)

  * CHARACTER ALONE PAGE

![character-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/2864f2ed-e7e7-4817-803d-363982a3c822)

  * COMICS PAGE

 ![comics-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/9d33f5aa-831d-4793-946d-acb82c500e6c)
 
  * COMIC ALONE PAGE

![comic-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/9eae5280-44dd-4acb-a74e-97145bb5af76)
 
  * FAVS PAGE

![favs-big](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/efeabf9b-a4ea-4d3b-a8bb-e98d8c21992b)

* SMALL SCREENS (example with Samsung Galaxy A51/71)
  
  * HOMEPAGE

 ![homepage-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/36b42332-737a-426f-b837-b490c009d337)

  * REGISTER MODAL

 ![register-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/c7aef87e-d703-4cf5-a18a-08f832582cc8)

  * LOGIN MODAL

 ![login-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/ce76c2be-dca7-4410-a4ad-128a3f998238)

  * CHARACTERS PAGE

 ![characters-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/22333295-d09f-48db-8651-0b7c42acaaf7)

  * CHARACTER ALONE PAGE

 ![character-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/01c79dfc-b1be-46f0-8be5-5c99f71eb3a8)

  * COMICS PAGE

 ![comics-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/dd035c8c-c91e-41fe-8625-d5b992860e78)

  * COMIC ALONE PAGE

 ![comic-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/450d0239-af5f-43f1-b75f-4fd64258b87e)

  * FAVS PAGE
  
 ![favs-small](https://github.com/Vincent-Saillard/Marvel-Front/assets/144067650/c9444a61-7033-4cb1-8ce4-030b4377c502)

## Author

Vincent Saillard

* https://www.linkedin.com/in/vincent-saillard-096255a7/
* https://github.com/Vincent-Saillard

## Acknowledgments

Inspiration, code snippets, etc.
* [Loading-Circle-CSS](https://loading.io/css/)
* Dall-E AI picture generator for missing Characters/Comics pictures
