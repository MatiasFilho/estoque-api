const { Schema, model } = require('mongoose');
const MongoosePaginate = require('mongoose-paginate');

const ItemSchema = new Schema({
  _user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

ItemSchema.plugin(MongoosePaginate);
module.exports = model('Item', ItemSchema);
