import { FC, FormEvent, useContext, useState } from 'react'
import { Context } from '..'
import DictionaryService from '../services/DictionaryService'

const selectOptions = [
  'nouns',
  'adjectives',
  'verbs',
  'numerals',
  'pronouns',
  'prepositions',
]

const AddWordForm: FC = () => {
  const { store } = useContext(Context)
  const [word, setWord] = useState({
    newWord: '',
    translation: '',
    type: '',
  })

  const formSubmitHandler = async (e: FormEvent) => {
    e.preventDefault()
    console.log(word)
    const response = await DictionaryService.addNewEntry({
      ...word,
      user: store.user.email,
    })
    console.log('RESPONSE', response)
  }

  const selectChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setWord({ ...word, type: event.target.value })
  }

  return (
    <div>
      <div> AddWordsForm</div>
      <form onSubmit={formSubmitHandler}>
        <input
          type='text'
          placeholder='Word'
          onChange={(e) => setWord({ ...word, newWord: e.target.value })}
          value={word.newWord}
        />
        <input
          type='text'
          placeholder='Translation'
          onChange={(e) => setWord({ ...word, translation: e.target.value })}
          value={word.translation}
        />
        <label htmlFor='type'>Type:</label>
        <select
          onChange={selectChangeHandler}
          id='type'
          defaultValue={'DEFAULT'}
        >
          <option value='DEFAULT' disabled>
            Choose a type ...
          </option>
          {selectOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button type='submit'>Add New Word</button>
      </form>
    </div>
  )
}

export default AddWordForm
