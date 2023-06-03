export const getUsersQuery = 'SELECT * FROM users';
export const getUserByIdQuery = 'SELECT * FROM users WHERE id = $1';
export const checkEmailExistsQuery = 'SELECT u FROM users u WHERE u.email = $1';
export const addUserQuery =
	'INSERT INTO users (name, email, password) VALUES ($1, $2, $3)';
export const deleteUserQuery = 'DELETE FROM users WHERE id = $1';
export const updateUserQuery =
	'UPDATE users set name = $2, email = $3 where id = $1';
