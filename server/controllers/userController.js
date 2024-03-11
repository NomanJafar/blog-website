const userService = require("../services/userService");

const userController = {
    register: async (req, res, next) => {
        const { username, email, password } = req.body;
        try {
            const user = await userService.register(username, email, password);
            res.apiSuccess(user, 201, false, 'registration successfull');
        } catch (error) {
            next(error);
        }
    },
    login: async (req, res, next) => {
        const { email, password } = req.body;
        try {
            const token = await userService.login(email, password);
            res.apiSuccess({ ...token }, 200, true, 'logged In successfully');
        } catch (error) {
            next(error);
        }
    },
    getAll: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            res.apiSuccess(users);
        } catch (error) {
            next(error);
        }
    },
    getById: async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await userService.getUserById(parseInt(id));
            res.apiSuccess(user);
        } catch (error) {
            next(error);
        }
    },
    delete: async (req, res, next) => {
        const { id } = req.params;
        try {
            const user = await userService.deleteUser(parseInt(id));
            res.apiSuccess(user, 200, 'user deleted successfully');
        } catch (error) {
            next(error);
        }
    },
    update: async (req, res, next) => {
        const { id } = req.user;
        const { username, password } = req.body;
        try {
            const user = await userService.updateUser(parseInt(id), username, password);
            res.apiSuccess(user, 200, 'user updated successfully');
        } catch (error) {
            next(error);
        }
    },
}

module.exports = userController;