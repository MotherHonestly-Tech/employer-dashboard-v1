export const OPEN_MODAL = 'OPEN_MODAL';

export const walletReducer = (
  state: any,
  action: {
    type: string;
    id: string;
    open: boolean;
  }
) => {
  switch (action.type) {
    case OPEN_MODAL:
      const updatedState = {
        ...state,
        [action.id]: action.open
      };
      return updatedState;

    default:
      return state;
  }
};
