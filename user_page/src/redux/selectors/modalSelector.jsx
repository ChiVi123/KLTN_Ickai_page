import { typeState } from '../variables';

export const getIsOpen = (state = typeState) => state.modal.isOpen;
