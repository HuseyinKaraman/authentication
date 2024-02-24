const { roles } = require("../configs/roles");
const Boom = require("boom");

const grantAccess = (action, resource) => {
    return async (req, res, next) => {
        const permission = roles.can(req.payload.role)[action](resource);

        if (!permission.granted) {
            return next(Boom.unauthorized("You don't have permission."));
        }

        next();
    };
};

module.exports = grantAccess;
