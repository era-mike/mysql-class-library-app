
Integrate **React.js** with **MySQL** during Week 1. The activities revolve around building a simple **React app** that connects to a **MySQL database** via a backend API. The app evolves each day to reflect the concepts covered in the MySQL coursework, providing practical examples of SQL scripts and database management.

---

### **App Overview**
The app will simulate a **Library Management System**, where users can view, add, update, and delete books. Each day, new features will be implemented to demonstrate key MySQL concepts.

---

### **Day 1: Setting Up the App and Database**
**Objective:** Set up the project structure and database.

1. **React Setup**
   - Create a new React app using `create-react-app` or Vite.
   - Install dependencies:
     ```bash
     npm install axios react-router-dom
     ```
   - Set up a basic `App.js` with routing.

2. **Backend Setup**
   - Create a Node.js/Express app.
   - Install MySQL and Express:
     ```bash
     npm install express mysql2 cors
     ```
   - Set up an API endpoint:
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
       database: 'library'
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

     app.listen(3001, () => console.log('Server running on port 3001'));
     ```

3. **MySQL Database**
   - Create a database and table:
     ```sql
     CREATE DATABASE library;
     USE library;
     CREATE TABLE books (
       id INT AUTO_INCREMENT PRIMARY KEY,
       title VARCHAR(255) NOT NULL,
       author VARCHAR(255),
       status ENUM('Available', 'Checked Out') DEFAULT 'Available'
     );
     INSERT INTO books (title, author, status)
     VALUES ('The Great Gatsby', 'F. Scott Fitzgerald', 'Available');
     ```

4. **React Integration**
   - Fetch book data from the backend:
     ```javascript
     useEffect(() => {
       axios.get('http://localhost:3001/books')
         .then(res => setBooks(res.data))
         .catch(err => console.error(err));
     }, []);
     ```

---

### **Day 2: Adding Books (Data Insertion)**
**Objective:** Allow users to add books to the database.

1. **React Form**
   - Create a form for adding new books:
     ```jsx
     <form onSubmit={handleSubmit}>
       <input type="text" placeholder="Title" onChange={e => setTitle(e.target.value)} />
       <input type="text" placeholder="Author" onChange={e => setAuthor(e.target.value)} />
       <button type="submit">Add Book</button>
     </form>
     ```

2. **Backend Endpoint**
   - Add a `POST` endpoint:
     ```javascript
     app.post('/books', (req, res) => {
       const { title, author } = req.body;
       db.query('INSERT INTO books (title, author) VALUES (?, ?)', [title, author], (err) => {
         if (err) throw err;
         res.send('Book added');
       });
     });
     ```

3. **React Integration**
   - Submit form data to the backend using `axios.post`.

---

### **Day 3: Updating Book Status**
**Objective:** Update book statuses (e.g., marking as "Checked Out").

1. **Frontend: Add Status Buttons**
   - Add "Mark as Checked Out" and "Mark as Available" buttons for each book.

2. **Backend Endpoint**
   - Create an `UPDATE` endpoint:
     ```javascript
     app.put('/books/:id', (req, res) => {
       const { id } = req.params;
       const { status } = req.body;
       db.query('UPDATE books SET status = ? WHERE id = ?', [status, id], (err) => {
         if (err) throw err;
         res.send('Book status updated');
       });
     });
     ```

3. **React Integration**
   - Trigger status updates with `axios.put`.

---

### **Day 4: Deleting Books**
**Objective:** Demonstrate deletion of records.

1. **Frontend: Delete Button**
   - Add a "Delete" button for each book.

2. **Backend Endpoint**
   - Create a `DELETE` endpoint:
     ```javascript
     app.delete('/books/:id', (req, res) => {
       const { id } = req.params;
       db.query('DELETE FROM books WHERE id = ?', [id], (err) => {
         if (err) throw err;
         res.send('Book deleted');
       });
     });
     ```

3. **React Integration**
   - Trigger delete requests with `axios.delete`.

---

### **Day 5: Expanding with Queries**
**Objective:** Demonstrate querying concepts with sorting and filtering.

1. **Frontend: Filters**
   - Add a dropdown to filter books by status or search by title.

2. **Backend Endpoint**
   - Add a `GET` endpoint with filters:
     ```javascript
     app.get('/books/filter', (req, res) => {
       const { status, title } = req.query;
       const query = 'SELECT * FROM books WHERE status = ? OR title LIKE ?';
       db.query(query, [status, `%${title}%`], (err, results) => {
         if (err) throw err;
         res.send(results);
       });
     });
     ```

3. **React Integration**
   - Fetch filtered data based on user input.

---

### **Benefits**
1. **Reinforces MySQL concepts:**
   - Students will write SQL queries for `CREATE`, `INSERT`, `UPDATE`, `DELETE`, and `SELECT`.
   - Practice joins and filtering in later weeks as the app expands.

2. **Integrates React skills:**
   - State management, forms, API calls, and dynamic rendering.

3. **Engaging and Practical:**
   - Demonstrates the practical application of MySQL concepts in modern web apps.

Would you like detailed examples of specific React components or backend scripts?

### **Project File Structure**
```
library-management/
├── backend/
│   ├── index.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── BookForm.js
│   │   │   ├── BookList.js
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── api.js
```

---

### **Backend (Node.js/Express)**

#### **`index.js`**
```javascript
const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Database connection
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

// Fetch all books
app.get('/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) throw err;
    res.send(results);
  });
});

// Add a book
app.post('/books', (req, res) => {
  const { title, author } = req.body;
  const query = 'INSERT INTO books (title, author) VALUES (?, ?)';
  db.query(query, [title, author], (err) => {
    if (err) throw err;
    res.send('Book added successfully');
  });
});

// Update a book's status
app.put('/books/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const query = 'UPDATE books SET status = ? WHERE id = ?';
  db.query(query, [status, id], (err) => {
    if (err) throw err;
    res.send('Book status updated successfully');
  });
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM books WHERE id = ?';
  db.query(query, [id], (err) => {
    if (err) throw err;
    res.send('Book deleted successfully');
  });
});

// Start server
app.listen(3001, () => {
  console.log('Server is running on http://localhost:3001');
});
```

---

### **Frontend (React)**

#### **`api.js`**
Centralized file for API calls:
```javascript
import axios from 'axios';

const API_URL = 'http://localhost:3001';

export const fetchBooks = () => axios.get(`${API_URL}/books`);
export const addBook = (book) => axios.post(`${API_URL}/books`, book);
export const updateBookStatus = (id, status) => axios.put(`${API_URL}/books/${id}`, { status });
export const deleteBook = (id) => axios.delete(`${API_URL}/books/${id}`);
```

#### **`App.js`**
Main component:
```javascript
import React, { useState, useEffect } from 'react';
import { fetchBooks } from './api';
import BookForm from './components/BookForm';
import BookList from './components/BookList';

const App = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks()
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  }, []);

  const refreshBooks = () => {
    fetchBooks()
      .then(res => setBooks(res.data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h1>Library Management System</h1>
      <BookForm refreshBooks={refreshBooks} />
      <BookList books={books} refreshBooks={refreshBooks} />
    </div>
  );
};

export default App;
```

---

#### **`components/BookForm.js`**
Form for adding new books:
```javascript
import React, { useState } from 'react';
import { addBook } from '../api';

const BookForm = ({ refreshBooks }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ title, author })
      .then(() => {
        setTitle('');
        setAuthor('');
        refreshBooks();
      })
      .catch(err => console.error(err));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        required
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default BookForm;
```

---

#### **`components/BookList.js`**
List of books with actions:
```javascript
import React from 'react';
import { updateBookStatus, deleteBook } from '../api';

const BookList = ({ books, refreshBooks }) => {
  const handleStatusChange = (id, status) => {
    updateBookStatus(id, status)
      .then(() => refreshBooks())
      .catch(err => console.error(err));
  };

  const handleDelete = (id) => {
    deleteBook(id)
      .then(() => refreshBooks())
      .catch(err => console.error(err));
  };

  return (
    <ul>
      {books.map(book => (
        <li key={book.id}>
          <span>{book.title} by {book.author} - {book.status}</span>
          <button onClick={() => handleStatusChange(book.id, 'Available')}>Mark Available</button>
          <button onClick={() => handleStatusChange(book.id, 'Checked Out')}>Mark Checked Out</button>
          <button onClick={() => handleDelete(book.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default BookList;
```

---

### **How It Works**
1. **Day 1:** Set up backend, React app, and basic book listing.
2. **Day 2:** Implement `BookForm` for adding books (`POST`).
3. **Day 3:** Add status update functionality (`PUT`).
4. **Day 4:** Add delete functionality (`DELETE`).
5. **Day 5:** Enhance with filters or sorting as a bonus.

This modular structure makes it easy to expand the app in future lessons. Let me know if you'd like additional features!