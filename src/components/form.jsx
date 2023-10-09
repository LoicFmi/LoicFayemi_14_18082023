import React from 'react';
import Modal from 'modal-library-lfmi';
import close from '../assets/img/close.png';

export default function Form() {
  return (
    <Modal
      iconClose={close}
      title="Confirmation"
      hideTitle="false"
      text="Employee created"
      hideText="false"
    />
  );
}
