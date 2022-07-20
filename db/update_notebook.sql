update notebook
set common_name = $2,
bird_height = $3,
food = $4,
color = $5,
bird_weight = $6,
ecosystem = $7,
migration = $8,
family = $9,
sci_name = $10
where notebook_id = $1
returning *;