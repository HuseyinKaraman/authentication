const RateLimit = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");
const redis = require("../clients/redis");
const Boom = require("boom");

const limiter = new RateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 5, // limit each IP to 5 requests per windowMs
    store: new RedisStore({
        client: redis,
        resetExpiryOnChange: true,
        expiry: 30,
    }),
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    handler: (req, res, next) => {
        next(Boom.tooManyRequests("Too many login attempts from this IP, please try again in 1 minute"));
    },
});

module.exports = limiter;
