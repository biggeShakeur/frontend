# Vision

**What is the vision of this product?**  
Our product aims to help the adventurer that likes to record their travels via note-taking and journaling. The application allows a user to explore different areas with the Open Trip Map API. The user can then create notes/journals for the future or create notes/journals during the adventure! The application also has the added utility of forecasting the weather so the user can plan ahead. Lastly, we provide weather boost information from the Pokemon Go app to let the user know which weather boosts will be available that day.

**What pain point does this project solve?**  
The main pain point we want to solve is to give a user the ability to see new attractions they may never have heard before and also gives them the utility of jorunaling their experience on the go.

**Why should we care about your product?**  
Our product gives a user the value of storing journals and memories in one place to refer back to. The utility also helps the user with planning ahead with forecasted weather and the ability to track notes as they plan.

## Scope (In/Out)

IN - What will your product do: Describe the individual features that your product will do. High overview of each. Only need to list 4-5

- The product will search a location for attractions based on the user's input and supply detailed descriptions.
- The product will pull weather data and forecast up to 5 days.
- The product will allow the user to enter notes and journal entries for the user to store for later.
- The poduct will save this information unique to that user.  

OUT - What will your product not do.
These should be features that you will make very clear from the beginning that you will not do during development. These should be limited and very few. Pick your battles wisely. This should only be 1 or 2 things. Example: My website will never turn into an IOS or Android app.  

- Won't become a photo storing database
- Won't have an open forum/social media capabilities

### Minimum Viable Product vs What will your MVP functionality be?  
The application will provide the user with a map of the area they wish to visit along with a 5 day forecast of weather and the ability to write, read, upload, and delete notes/journals.

### What are your stretch goals?  
- Add Pokemon Go API weather boost information based on weather forecasts

## Stretch
What stretch goals are you going to aim for?  
- Add Pokemon Go API weather boost information based on weather forecasts

## Functional Requirements
List the functionality of your product. This will consist of tasks such as the following:

- User can access, update, and delete their past notes/journals.
- User can get weather forecasts by area
- User can get detailed descriptions of attractions based on the location query

Data Flow
Describe the flow of data in your application. Write out what happens from the time the user begins using the app to the time the user is done with the app. Think about the “Happy Path” of the application. Describe through visuals and text what requests are made, and what data is processed, in addition to any other details about how the user moves through the site.  

1. The user is first presented with the requirement to log in using Auth0 (Auth0 will do authenticating and authorization).
2. The user is then directed to the main page that greets them and gives a short overview of how the site works.
3. A large "Add Trip" button is visible for the user to click on to begin their adventure!
4. A model will popup after clicking "Add Trip" which will then ask for the user's input.
    - Desired location
    - Tentative date of travel

## Non-functional requirements are requirements that are not directly related to the functionality of the application but still important to the app

Security - Auth0 will save data based on token/account to MongoDB. That key will be required to access that particular data.
Usability
Usability - The application will provide usability for those with vision impairment by utilizing built-in functions of bootstrap and HTML5 to help screen readers.
