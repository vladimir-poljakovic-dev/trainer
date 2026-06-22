CREATE TABLE users( --Creating users table
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL,
    username text NOT NULL UNIQUE,
    password text NOT NULL
)

CREATE TABLE todos ( --Creating Todos tasks table
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
)

CREATE TABLE exmaple(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
)
-- Inserts
INSERT INTO users (email, username, password)
VALUES ('acodekan345@gmail.com', 'Alex','password');

INSERT INTO users (email, username, password)
VALUES ('JohnDoe@gmail.com', 'John','password1');

INSERT INTO todos (title, completed, user_id)
VALUES ('Study german',0,1);

INSERT INTO todos (title, completed, user_id)
VALUES ('Show up to praksa',1,1);

--Select all
SELECT * FROM users;
SELECT * FROM todos;

--Select by id
SELECT * FROM users WHERE id =1;

--Update
UPDATE users 
SET username ='Aleksandar' 
WHERE user_id=1;

UPDATE todos
SET completed=1
WHERE completed=0;

--Delete
DELETE FROM users WHERE user_id=2;

DROP TABLE exmaple;

--Join, all todos for a specific user
SELECT users.username, todos.title, todos.completed
FROM todos
JOIN users ON todos.user_id = users.id
WHERE users.id=1;

--Count todos per user
SELECT users.username, COUNT(todos.id) AS todo_count
FROM users
LEFT JOIN todos ON todos.user_id = users.id
GROUP BY users.id;
