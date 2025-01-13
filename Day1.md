Let’s walk through **Day 1**: Setting up the **React + Node.js** app and connecting to a **MySQL database**. Follow these steps:

---

### **1. Set Up the Project Directory**
1. **Create a Project Folder**:
   ```bash
   mkdir library-management
   cd library-management
   ```

2. **Set Up Subfolders**:
   - Inside `library-management`, create two directories:
     ```bash
     mkdir backend frontend
     ```

---

### **2. Backend Setup**

#### **Step 1: Initialize the Backend**
1. Navigate to the backend folder:
   ```bash
   cd backend
   ```
2. Initialize a Node.js project:
   ```bash
   npm init -y
   ```
3. Install required packages:
   ```bash
   npm install express mysql2 cors
   ```

#### **Step 2: Create the `index.js` File**
1. In the `backend` folder, create a file named `index.js`:
   ```bash
   touch index.js
   ```
2. Add this code to `index.js` (using any code editor like VS Code):
   ```javascript
   const express = require('express');
   const mysql = require('mysql2');
   const cors = require('cors');

   const app = express();
   app.use(cors());
   app.use(express.json());

   const db = mysql.createConnection({
       host: 'localhost',
       user: 'root',
       password: 'yourpassword',
       database: 'library',
   });

   db.connect(err => {
       if (err) throw err;
       console.log('Connected to MySQL');
   });

   app.get('/books', (req, res) => {
       db.query('SELECT * FROM books', (err, results) => {
           if (err) throw err;
           res.send(results);
       });
   });

   app.listen(3001, () => console.log('Server running on http://localhost:3001'));
   ```

3. Replace `yourpassword` with your MySQL root password.

---

#### **Step 3: Set Up the MySQL Database**
1. Open MySQL:
   ```bash
   mysql -u root -p
   ```
2. Create the database and table:
   ```sql
   CREATE DATABASE library;
   USE library;

   CREATE TABLE books (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255),
       status ENUM('Available', 'Checked Out') DEFAULT 'Available'
   );

   INSERT INTO books (title, author, status) VALUES 
   ('The Great Gatsby', 'F. Scott Fitzgerald', 'Available'),
   ('To Kill a Mockingbird', 'Harper Lee', 'Available')
   ('1984', 'George Orwell', 'Checked Out');

   ```

3. Test the connection by running the backend:
   ```bash
   node index.js
   ```
   - Open a browser and go to: `http://localhost:3001/books`
   - You should see the book data in JSON format.

---

### **3. Frontend Setup**

#### **Step 1: Initialize the React App**
1. Navigate to the frontend folder:
   ```bash
   cd ../frontend
   ```
2. Create a React app using Vite or Create React App:
   - Vite:
     ```bash
     npm create vite@latest .
     ```
   - Create React App:
     ```bash
     npx create-react-app .
     ```

#### **Step 2: Install Dependencies**
1. Install necessary packages:
   ```bash
   npm install axios react-router-dom
   ```

---

#### **Step 3: Create Basic React Files**
1. Open the `src` folder and add these files:
   - `src/api.js`: API calls for backend communication.
   - `src/components/BookList.js`: Display the book list.
   - Modify `App.js` to use the new component.

2. **`api.js`**:
   ```javascript
   import axios from 'axios';

   const API_URL = 'http://localhost:3001';

   export const fetchBooks = () => axios.get(`${API_URL}/books`);
   ```

3. **`BookList.js`**:
   ```javascript
   import React, { useEffect, useState } from 'react';
   import { fetchBooks } from '../api';

   const BookList = () => {
       const [books, setBooks] = useState([]);

       useEffect(() => {
           fetchBooks()
               .then(res => setBooks(res.data))
               .catch(err => console.error(err));
       }, []);

       return (
           <div>
               <h2>Book List</h2>
               <ul>
                   {books.map(book => (
                       <li key={book.id}>
                           {book.title} by {book.author} ({book.status})
                       </li>
                   ))}
               </ul>
           </div>
       );
   };

   export default BookList;
   ```

4. **`App.js`**:
   Replace with:
   ```javascript
   import React from 'react';
   import BookList from './components/BookList';

   const App = () => {
       return (
           <div>
               <h1>Library Management System</h1>
               <BookList />
           </div>
       );
   };

   export default App;
   ```

---

### **4. Run the Application**
1. Start the backend server:
   ```bash
   cd ../backend
   node index.js
   ```
2. Start the React app:
   ```bash
   cd ../frontend
   npm start
   ```
3. Open your browser at `http://localhost:3000`.

---

### **Expected Outcome for Day 1**
- A **running backend** that serves book data from MySQL.
- A **React frontend** displaying the book list fetched from the backend.

