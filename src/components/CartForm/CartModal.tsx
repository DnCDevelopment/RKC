import React, { useContext } from 'react';
import { ICartModalProps } from './Types';
import context from '../../context/context';
import { TRANSLATE } from '../../constants/languages';

const CartModal: React.FC<ICartModalProps> = ({ status }) => {
  const { language } = useContext(context);
  const { successOrder, failedOrder } = TRANSLATE[language as 'ru' | 'ua'];
  return (
    <div>
      <h2>{status === 'success' ? successOrder : failedOrder}</h2>
    </div>
  );
};

export default CartModal;
