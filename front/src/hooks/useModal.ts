import { useDispatch, useSelector } from 'react-redux';
import { closeModal, openModal } from 'store/globalSlice';
import { RootState } from 'store/store';

interface ModalActionType {
  open: () => void;
  close: () => void;
}

const useModal = (): [boolean, ModalActionType] => {
  const dispatch = useDispatch();
  const modalShowBoolean = useSelector(({ global }: RootState) => global.modal);

  const actions: ModalActionType = {
    open: () => {
      dispatch(openModal());
    },
    close: () => {
      dispatch(closeModal());
    },
  };

  return [modalShowBoolean, actions];
};

export default useModal;