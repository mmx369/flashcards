import { model, Schema } from 'mongoose'

const Dictionary = new Schema({
  value: { type: String, unique: true },
})

export default model('Dictionary', Dictionary)
