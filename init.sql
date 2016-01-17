CREATE TABLE IF NOT EXISTS expenses(id INTEGER AUTO_INCREMENT, name TEXT,
                                                       value FLOAT(10,2), type TEXT, currency TEXT, category TEXT, user_id INTEGER,
 PRIMARY KEY (id), FOREIGN KEY (user_id) REFERENCES users(id));
CREATE TABLE IF NOT EXISTS users(id INTEGER AUTO_INCREMENT, login TEXT NOT NULL,
                                 email TEXT NOT NULL, password TEXT NOT NULL, first_name TEXT, last_name TEXT,
 PRIMARY KEY (id));