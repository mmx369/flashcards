import { useState } from 'react';
import { IWord } from '../models/IWord';
import Modal from '../components/Modal/Modal';

import classes from './WordCard.module.css';
import { ModalEditForm } from '../components/ModalContent/ModalEditForm';
import { useGetCurrentLanguage } from '../hooks/useGetCurrentLanguage';

export function WordCard(props: IWord) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentLanguage } = useGetCurrentLanguage();

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal} title='My Modal'>
          <ModalEditForm
            lng={currentLanguage}
            id={props._id}
            onClose={handleCloseModal}
          />
          <button onClick={handleCloseModal}>Close Modal</button>
        </Modal>
      </div>

      <div className={classes.card}>
        <div>{props.word}</div>
        <div>{props.translation}</div>
        <div>{props.example}</div>
        <button onClick={handleOpenModal}>Edit</button>
      </div>
    </>
  );
}
