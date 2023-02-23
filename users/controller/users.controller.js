const { generateAccessToken } = require('../../auth/auth');
const user = require('../service/userService');

/**
 * @param {*} req
 * @param {*} res
 */

async function createUser(req, res, next) {
    try {
        await user.createUser(req.body)
        const { email } = req.body;
        const token = await generateAccessToken(email)
        res.json({
            message: "User created successfully",
            token
        })
    } catch (err) {
        return next(err);
    }
}

async function login(req, res, next) {
    try {
        await user.login(req.body)
        const { email } = req.body;
        const token = await generateAccessToken(email)
        res.json({
            message: "Login successfully",
            token
        })
    } catch (error) {
        return next(error)
    }
}

async function getUsers(req, res, next) {
    try {
        const users = await user.getUser();
        res.json({
            message: "User fetched",
            users
        })
    } catch (err) {
        throw next(err);
    }
}

async function getUserById(req, res, next) {
    try {
        const { userId } = req.params
        const users = await user.getUserById(userId);
        res.json({
            message: "User fetched",
            users
        })
    } catch (err) {
        throw next(err);
    }
}

async function deleteUser(req, res) {
    try {
        const { userId } = req.params;
        await user.deleteUser(userId)
        res.json({
            message: "User deleted successfully"
        })
    } catch (error) {
        throw error;
    }
}

async function updateUser(req, res) {
    try {
        const { userId } = req.params;
        await user.updateUser(userId, req.body)
        res.json({
            message: "User detail updated successfully"
        })
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    login,
    getUsers,
    getUserById,
    deleteUser,
    updateUser
}