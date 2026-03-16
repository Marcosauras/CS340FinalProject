<div align="center">

# Animal Rescue

A database-driven animal rescue management system for tracking animals, fosters, adopters, applications, and medical records.

[Project Overview](#about-the-project) •
[Database Structure](#database-structure) •
[Citations](#citations)

</div>

## About The Project

Animal Rescue; is a database driven system that can help animal shelters keep track
of animals that need rescuing and manage them throughout the rescue process. The system is
designed to handle 400 animal intakes per year and keep track of 120 foster homes. It will also
handle tracking up to 40 adoption applications at a time and whether or not they were
successfully adopted. Along with maintaining medical records for each animal such as
appointments and any notes. This system brings foster, adoption and medical information all
together in one place, allowing for the animals to all receive the proper care they deserve.

## Built With

**Tech used**

<div align="center">

![React](https://img.shields.io/badge/Frontend-React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![HTML5](https://img.shields.io/badge/Frontend-HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/Styling-CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)

![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Server-Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MySQL](https://img.shields.io/badge/Database-MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![SQL](https://img.shields.io/badge/Language-SQL-336791?style=for-the-badge&logo=postgresql&logoColor=white)
![CRUD](https://img.shields.io/badge/Features-CRUD-blue?style=for-the-badge)

</div>

---

## Database Structure

The database has six main tables:

### 1. Animals
Stores information about each animal, including name, species, breed, sex, and age. 

### 2. Fosters
Stores foster parent information such as name, phone, email, and capacity.

### 3. Adopters
Stores information about people interested in adoption, including optional notes.

### 4. MedicalRecords
Stores information around all medical concerns and appointments. Including appointment dates and care notes for each animal.

### 5. AnimalFosterDetails
An intersection table between **Animals** and **Fosters**, that also lets the user keep track of which foster cared for which animal and when.

### 6. Applications

Tracks adoption applications by linking **Fosters** and **Animals**, that keeps track of which adopter put an application in, which pet they are trying to adopt, along with date, current status and the date of the adoption (if the adopter did adopt the animal)

---

## Citations


### README Template
This readme is adapted from othneildrew Best-README-Template
[Github link]https://github.com/othneildrew/Best-README-Template/edit/main/README.md

### REACT APP
The creation of the base REACT app was made from following the steps provided in the Exploration - Web Application Technology
[Web Application Technology] https://canvas.oregonstate.edu/courses/2031764/pages/exploration-web-application-technology-2?module_item_id=26243419

### CRUD implimentation
All CUD operations where adapted (for front and backend) from the examples shown in the exploration 
"Exploration - Implementing CUD operations in your app"
[Implementing CUD operations]https://canvas.oregonstate.edu/courses/2031764/pages/exploration-implementing-cud-operations-in-your-app?module_item_id=26243436

### Formatting dates
The formatting of the dates in the website was adapted from the following two sources to understand toisostring and how to use it for my needs
https://www.w3schools.com/jsref/jsref_toisostring.asp
https://stackoverflow.com/questions/10830357/javascript-toisostring-ignores-timezone-offset