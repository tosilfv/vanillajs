# Ghibli Anime movies
Ghibli Anime movies list site.

## Background
This project was made with HTML, vanilla JavaScript and CSS without external frameworks or libraries excluding axios and Google Fonts. The purpose was to practise using a third-party API as a backend component and to use only the basic browser technologies for the frontend. The API used is located in the Heroku platform at https://ghibliapi.herokuapp.com. I decided not to use TDD or write any tests in order to finish the project faster and considering that this was a hobby project for myself.

## Design decisions
index.html: The markup was tested and cleared by https://validator.w3.org.
The favicon.ico was created at https://pngtoicon.com.
Fonts are from Google Fonts.
Properties are arranged alphabetically.
Static markup is used for elements that are not going to alter or change by user interaction with the web page while the rest is created dynamically with JavaScript.
Id-tags are used only with elements with a label while the rest is using classes.
Text content is written in lowercase.

reset.css: The css reset was copied from http://meyerweb.com/eric/tools/css/reset.

styles.css: Styles are arranged alphabetically, by specificity and by selector amount.
Styles are created as DRY as possible and in turn they are not arranged by function, element group or theme.
Media queries try to use as universal break points as possible.

index.js: Code is arranged alphabetically.
Constants and variables are arranged to the top of the file.
API calls are reduced to minimum although each call to image url makes an API call.
Big-O notation of type n^2 exist with a for-loop nesting another for-loop that is related to an API call.
Code is arranged by location in the page from top to bottom.
Event listeners and helper functions are arranged in their respective sections.
New elements are created only if it was seen as a necessary operation.

## Other, miscellaneous, known errors
The amount of dead code is unknown. Not all design decisions were possible to implement in all cases. Relative units [rem] are used when possible. Carousel workings have some inconsistencies when browser window is minimized and then maximized.