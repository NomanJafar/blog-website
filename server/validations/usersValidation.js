const { createUserDto } = require("../dtos/request/createUser");
const { loginUserDto } = require("../dtos/request/loginUser");
const { updateUserDto } = require("../dtos/request/updateUser");
const { userIdDto } = require("../dtos/request/userId");
const usersValidation = {
    loginUserValidation: (req, res, next) => {
        const { error } = loginUserDto.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.apiError(400, false, errors);
        }
        next();
    },
    createUserValidation: (req, res, next) => {
        const { error } = createUserDto.validate(req.body, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.apiError(400, false, errors);
        }
        next();
    },

    updateUserValidation: (req, res, next) => {
        const { error: e1 } = userIdDto.validate(req.params, { abortEarly: false });
        const { error: e2 } = updateUserDto.validate(req.body, { abortEarly: false });
        if (e1 || e2) {
            const paramErrors = e1?.details.map((detail) => detail.message);
            const bodyErrors = e2?.details.map((detail) => detail.message);
            return res.apiError(400, true, paramErrors.concat(bodyErrors));
        }
        next();
    },

    UserIdValidation: (req, res, next) => {
        const { error } = userIdDto.validate(req.params, { abortEarly: false });
        if (error) {
            const errors = error.details.map((detail) => detail.message);
            return res.apiError(400, true, errors);
        }
        next();
    }
}

module.exports = usersValidation;