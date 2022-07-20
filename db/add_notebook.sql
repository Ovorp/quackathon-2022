INSERT INTO notebook
(username)
VALUES
($1)
RETURNING *;