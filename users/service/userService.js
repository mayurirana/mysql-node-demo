const options = require('../../database.config')
const knex = require('knex')(options);
const bcrypt = require('bcrypt');

/**
 * create User
 */

async function createUser(user) {
    try {
        const findEmail = await knex('user_info').where('email', user.email);
        if (findEmail.length) {
            throw new Error('User already exits with this mail');
        }
        const dob = new Date(user.dob * 1000)
        await knex('user_info').insert({
            name: user.full_name,
            dob: dob,
            email: user.email,
            password: await bcrypt.hash(user.password, 10)
        })
    } catch (err) {
        throw err;
    }
}

/**
 * login user
 */

async function login(user) {
    try {
        const userData = await knex('user_info').where({
            email: user.email
        }).first()

        if (!userData) {
            throw new Error('email is not exits or wrong');
        }
        const pass = await bcrypt.compare(user.password, userData.password)

        if (!pass) {
            throw new Error('password is wrong')
        }
        return userData;
    } catch (error) {
        throw error;
    }
}

/**
 * get user
 */

async function getUser() {
    try {
        const userList = await knex('user_info')
        .select('id')
        .select('name')
        .select('dob')
        .select('email')
        return userList;
    } catch (err) {
        throw err;
    }
}

/**
 * get user ny id
 */

async function getUserById(userId) {
    try {
        const userList = await knex('user_info').where({
            'id': userId
        })
        .select('id')
        .select('name')
        .select('dob')
        .select('email')
        return userList;
    } catch (err) {
        throw err;
    }
}

/**
 * delete user
 */

async function deleteUser(userId) {
	const checkEmployee = await knex('user_info').where('id', userId)
	if (!checkEmployee.length) {
		throw new Error('User Not Found')
	}

	await knex('user_info').where('id', userId).del()
}

/**
 * update user
 */

async function updateUser(userId, userDetails) {
	const checkUser = await knex('user_info').where('id', userId)
	if (!checkUser.length) {
		throw new Error('user not found')
	}
	await knex('user_info').where('id', userId)
		.update({
			name: userDetails.full_name,
			email: userDetails.email,
			dob: userDetails.dob
		})
}

module.exports = {
    createUser,
    login,
    getUser,
    getUserById,
    deleteUser,
    updateUser
}