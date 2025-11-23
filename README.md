 Auth Endpoints
These endpoints handle user registration and login to obtain an access token.

1. Register a New User
Endpoint: localhost:8000/auth/registe
Method: POST
Body (JSON):
{
    "name": "tushar alewar",
    "email": "tushadr@gmail.com",
    "password": "123456"
}

2. User Login
Endpoint: localhost:8000/auth/login
Method: POST
Body (JSON):
{
    "email": "tushar@gmail.com",
    "password": "123456"
}


 Book  Endpoints

Authorization Requirement:
All Book endpoints require an Admin JWT in the Authorization header as Bearer <token>.

1. Create a New Book
Endpoint: localhost:8000/books/create
Method: POST
Body (JSON):
{
  "title": "Devdas",
  "author": "Shahrukh",
  "isbn": "Lsd45-4483-343-4ju5t-35",
  "publicationDate": "12-12-25",
  "genre": "Love",
  "totalCopies": 200
}

2. Update Book Details
Endpoint: localhost:8000/books/6922c3d7efbf789b81ea4ae7
Method: PUT
Path Parameter: :bookId (e.g., 6922c3d7efbf789b81ea4ae7)
Body (JSON)
{
    "title":"Saiyara"
}


3. Delete a Book
Endpoint: localhost:8000/books/6922c395efbf789b81ea4ae5
Method: DELETE
Path Parameter: :bookId (e.g., 6922c395efbf789b81ea4ae5)
Body: None (The example body is unnecessary for a DELETE request.)


4. Get Single Book Details
Endpoint: localhost:8000/books/6922c3d7efbf789b81ea4ae7
Method: GET
Path Parameter: :bookId (e.g., 6922c3d7efbf789b81ea4ae7)
Body: None


5. List All Books
Endpoint: /books
Method: GET
Description: Retrieves a list of all books in the library.
Body: None
Access: Admin (Permissions might be extended to Member for read access)
Example URL: http://localhost:8000/books



 Borrow Endpoints


Authorization Requirement:
All Borrowing endpoints require a valid JWT in the Authorization header. Typically Member for borrow/return and Admin for history.

1. Borrow a Book
Endpoint: /borrow/:bookId
Method: POST
Description: Records a book as borrowed by the authenticated user.
Path Parameter: :bookId (e.g., 6922c3d7efbf789b81ea4ae7)
Body: None
Access: Member / Admin
Example URL: http://localhost:8000/borrow/6922c3d7efbf789b81ea4ae7

2. Return a Book
Endpoint: /borrow/return/:bookId
Method: POST
Description: Records a book as returned, likely updating the inventory and clearing the user's loan record for this book.
Path Parameter: :bookId (e.g., 6922c3d7efbf789b81ea4ae7)
Body: None
Access: Member / Admin
Example URL: http://localhost:8000/borrow/return/6922c3d7efbf789b81ea4ae7



3. Get Borrow History
Endpoint: /borrow/history
Method: GET
Description: Retrieves the borrowing and returning history. The results may be specific to the authenticated user (Member) or all users (Admin).
Body: None
Access: Admin (Likely Member for their own history)
Example URL: http://localhost:8000/borrow/history




📊 Reporting Endpoints
These endpoints provide administrative reports on library activity. They typically require Admin privileges.

Authorization Requirement:
All Reporting endpoints require an Admin JWT in the Authorization header.

1. Most Borrowed Books Report
Endpoint: /reports/most-borrowed
Method: GET
Description: Generates a report listing the books with the highest borrowing frequency.
Body: None
Access: Admin
Example URL: http://localhost:8000/reports/most-borrowed

2. Active Members Report
Endpoint: /reports/active-members
Method: GET
Description: Generates a report listing the most active library members (e.g., by the number of books borrowed).
Body: None
Access: Admin
Example URL: http://localhost:8000/reports/active-members

3. Book Availability Report
Endpoint: /reports/availability
Method: GET
Description: Generates a report summarizing the current availability status (total copies, copies out, copies available) of books.
Body: None
Access: Admin
Example URL: http://localhost:8000/reports/availability

 User 
These endpoints manage user accounts. They typically require Admin privileges.

Authorization Requirement:
All User endpoints require an Admin JWT in the Authorization header.

1. List All Users
Endpoint: /users
Method: GET
Description: Retrieves a list of all user accounts.
Body: None
Access: Admin
Example URL: http://localhost:8000/users
2. Get Single User Details
Endpoint: /users/:userId
Method: GET
Description: Retrieves the details of a specific user by their ID.
Path Parameter: :userId (e.g., 692210783c138340cc2e9203)
Body: None

Access: Admin (Likely Member for their own profile)
Example URL: http://localhost:8000/users/692210783c138340cc2e9203
