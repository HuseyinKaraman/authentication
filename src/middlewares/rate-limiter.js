import RateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis  from "../clients/redis.js";
import Boom from 'boom';

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

export default limiter;
