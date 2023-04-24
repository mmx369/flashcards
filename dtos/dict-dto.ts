export class DictDto {
  word
  id
  translation
  constructor(model: any) {
    console.log(111, model)
    this.word = model.word
    this.id = model._id
    this.translation = model.translation
  }
}
