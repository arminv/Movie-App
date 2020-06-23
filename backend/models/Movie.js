const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  movies: {
    type: Array,
    required: true,
  },
  // movies: [
  //   {
  //     user: {
  //       type: Schema.Types.ObjectId,
  //       ref: 'users',
  //     },
  //     movieId: {
  //       type: Number,
  //       required: true,
  //     },
  //     date: {
  //       type: Date,
  //       default: Date.now,
  //     },
  //   },
  // ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Movie = mongoose.model('post', MovieSchema);
