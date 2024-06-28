import { model, Schema } from 'mongoose';

const Dictionary = new Schema({
  word: { type: String, required: true },
  translation: { type: String, required: true },
  type: { type: String, default: '' },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  counter: { type: Number, default: 0 },
  favs: { type: Boolean, default: false },
  lng: { type: String, required: true },
  example: { type: String, default: '' },
});

export default model('Dictionary', Dictionary);
