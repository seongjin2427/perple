import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from 'store/globalSlice';
import { RootState } from 'store/store';

export interface ModalActionsType {
  open: () => void;
  close: () => void;
}

const useModal = (): [boolean, ModalActionsType] => {
  const modalBoolean = useSelector(({ global }: RootState) => global.modal);
  const dispatch = useDispatch();

  const actions = {
    open: () => dispatch(openModal()),
    close: () => dispatch(closeModal()),
  };
  return [modalBoolean, actions];
};

export default useModal;
