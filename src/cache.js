const expressRedisCache = require('express-redis-cache');
const redis = require('./clients/redis');

const cache = expressRedisCache({
  client: redis,
  expire: 60,
});

module.exports = cache;
