const {
  DB_REDIS_HOST = 'redis',
  DB_REDIS_PORT = 6379
} = process.env;

module.exports = {
  redis: `redis://${DB_REDIS_HOST}:${DB_REDIS_PORT}`
};
