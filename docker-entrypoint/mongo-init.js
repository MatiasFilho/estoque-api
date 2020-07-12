print('Start #################################################################');

db = db.getSiblingDB('estoque');
db.createUser(
  {
    user: 'user_estoque',
    pwd: 'pass_estoque',
    roles: [{ role: 'readWrite', db: 'estoque' }],
  },
);
db.createCollection('users');

print('END #################################################################');
