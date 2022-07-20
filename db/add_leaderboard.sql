insert into leaderboard
(username, animal)
VALUES
($1, $2)
returning *;