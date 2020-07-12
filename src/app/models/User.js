const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authConfig = require('../../config/auth');

const { Schema, model } = mongoose;

const UserSchema = new Schema({
  active: {
    type: Boolean,
    default: false,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  activeCode: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

UserSchema.pre('save', async function preSave (next) {
  if (!this.isModified('password')) {
    return next();
  }

  this.password = await bcrypt.hash(this.password, 10);

  next();
});

UserSchema.methods = {
  compareHash (password) {
    return bcrypt.compare(password, this.password);
  }
};

UserSchema.statics = {
  generateToken ({ id }) {
    return jwt.sign({ id }, authConfig.secret, {
      expiresIn: authConfig.ttl,
    });
  }
};

module.exports = model('User', UserSchema);
