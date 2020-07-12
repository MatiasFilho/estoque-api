const { Schema, model } = require('mongoose');
const MongoosePaginate = require('mongoose-paginate');

const HistoricItemSchema = new Schema({
  _item: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  qty: {
    type: Number,
    default: 0,
  }
}, {
  timestamps: true,
});

HistoricItemSchema.plugin(MongoosePaginate);
module.exports = model('HistoricItem', HistoricItemSchema);
