## Setup Instructions for the project 

### 1. Clone the Repository

```bash
git clone https://github.com/akhanal001/BookNest.git
```
### 2. Change directory 
```bash
cd BookNest
```
### 3. Switch Branch 
```bash
git checkout ashish
```
### 4. Install Backend Dependencies

```bash
npm install
```

### 3. Install Frontend Dependencies
```bash
cd frontend
npm install
```

### 4. Create a .env file in the root folder:

```bash
DATABASE_URL=
key= (Google Book api key)
JWT_SECRET=
NYT_API_KEY= 
```

### 5. Run backend
```bash
node server.js
```

### 6. Run frontend
```bash
cd frontend
npm run dev
```

---
## Deployed App URL
Website URL : 
```bash
https://booknest-nbd1.onrender.com/
```

Github Repo URL : 
```bash
https://github.com/akhanal001/BookNest.git
```


## Project Overview

BookNest - Journal for Books is a personal web app where users can search for books, save the ones they have read, or add a book to their Read list. This app allows users to keep a personal reading journal . It helps users stay organized by keeping track of what they have already read and what they want to read. This app is designed for students and book lovers to help them keep track of their reading habits.

## Reflection
#### Design Choices
I built BookNest using React for the frontend, Node.js/Express for the backend, and PostgreSQL for data storage.
React was chosen because it makes UI updates fast and predictable through reusable components and client-side routing. For the backend, I used an MVC-style structure of routes, controllers, models to keep the code organized and easy to maintain.

The database schema includes a users table and a books table. Each saved book is linked to a user through a foreign key, which allows secure storage of reading lists and full CRUD functionality. I decided on JWT authentication so each user gets a personalized experience, and protected routes ensure only logged-in users can access core features like favorites and profile updates.

#### Challenges
One of the biggest challenges was working with external APIs. Google Books often returned incomplete data, so I had to write to clean and normalize responses. I also realized Google doesn’t provide trending books, so the homepage looked empty. To fix this, I integrated the New York Times Books API, but the NYT API has a strict rate limit sometimes causing the homepage to show no trending books at all.

Deployment also brought issues. After moving to Render, certain sections like the homepage animation and NYT data failed due to route mismatches and environment variable handling. Debugging these taught me how production environments behave differently than local ones and helped me organize my backend more cleanly.

---

#### Learning Outcomes
Through this project, I learned how to build a complete full-stack system:
designing and structuring RESTful APIs
protecting routes with JWT authentication
Editing or making changes to things I want to display from the third-party API data before sending it to the frontend
modeling relational data with PostgreSQL
deploying a combined React /Express app on Render
handling real-world issues,  environment variables, and production routing and more.


#### Future Work
With more time, I would add:
reading statistics books finished, pages read, and also recommendations based on category preference. 
work more on the frontend to make the Homepage more user-friendly.
a progress bar for each book user enters the book number manually. 
smarter personalized recommendations which is missing currently.
a notes/review feature for each book
caching for NYT API results to avoid empty homepages
API change so there are fewer rate limitations. 






Final presintation link :
 ```bash
https://uncg-my.sharepoint.com/:v:/g/personal/a_khanal2_uncg_edu/IQAdvFJ_Df95SrZNs93iA0e4AbjCXGr3Ivfx7zjHKyXTAoE

```
