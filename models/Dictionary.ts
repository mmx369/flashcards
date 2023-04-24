import { model, Schema } from 'mongoose'

const Dictionary = new Schema({
  word: { type: String, unique: true, required: true },
  translation: { type: String, required: true },
  type: { type: String, required: true },
  user: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  hidden: { type: Boolean, default: false },
  counter: { type: Number, default: 0 },
  favs: { type: Boolean, default: false },
})

export default model('Dictionary', Dictionary)
