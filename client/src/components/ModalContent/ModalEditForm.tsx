import { ChangeEvent, FormEvent, useContext, useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import DictionaryService from '../../services/DictionaryService';
import { TLanguages } from '../../models/TLanguages';
import { notify } from '../../utils/notify';

import classes from './ModalEditForm.module.css';
import 'react-toastify/dist/ReactToastify.css';
import Backdrop from '../UI/Backdrop';
import { normilizeString } from '../../utils/normilize-string';
import { Context } from '../..';

interface FormData {
  word: string;
  translation: string;
  example: string;
}

export function ModalEditForm({
  lng,
  id,
  onClose,
}: {
  lng: TLanguages;
  id: string;
  onClose: () => void;
}) {
  const { store } = useContext(Context);
  const [isLoaderOpen, setIsLoaderOpen] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    word: '',
    translation: '',
    example: '',
  });

  const [errors, setErrors] = useState({
    word: '',
    translation: '',
  });

  useEffect(() => {
    async function getCurrentWord(lng: string) {
      try {
        const { data } = await DictionaryService.fetchSingleWord(lng, id);
        setFormData({
          word: data.word,
          translation: data.translation,
          example: data.example,
        });
      } catch (error) {
        notify(error.response.data.message, 'error');
      }
    }
    getCurrentWord(lng);
  }, [lng, id]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = { word: '', translation: '' };

    if (!formData.word) {
      newErrors.word = 'Word is required.';
      isValid = false;
    }
    if (!formData.translation) {
      newErrors.translation = 'Translation is required.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    console.log(formData);
    setIsLoaderOpen(true);
    try {
      // You can add your form submission logic here
      await DictionaryService.editWord(
        {
          newWord: normilizeString(formData.word),
          translation: normilizeString(formData.translation),
          example: formData.example,
          user: store.user.email,
          lng,
        },
        id
      );
      notify('Word updated succefully!', 'success');
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      notify(error.response.data.message, 'error');
    } finally {
      setIsLoaderOpen(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className={classes.control_group}>
          <div className={classes.form_control}>
            <label htmlFor='word'>Word:</label>
            <input
              type='text'
              name='word'
              value={formData.word}
              onChange={handleChange}
            />
            {errors.word && <p className={classes.error_text}>{errors.word}</p>}
          </div>

          <div className={classes.form_control}>
            <label htmlFor='translation'>Translation:</label>
            <input
              type='text'
              name='translation'
              value={formData.translation}
              onChange={handleChange}
            />
            {errors.translation && (
              <p className={classes.error_text}>{errors.translation}</p>
            )}
          </div>

          <div className={classes.form_control}>
            <label htmlFor='textarea'>Examples:</label>
            <textarea
              name='example'
              value={formData.example}
              onChange={handleChange}
            />
          </div>

          <button className={classes.button} type='submit'>
            Save Changes
          </button>
        </div>
      </form>
      <ToastContainer />
      <Backdrop open={isLoaderOpen} setOpen={setIsLoaderOpen} />
    </div>
  );
}
