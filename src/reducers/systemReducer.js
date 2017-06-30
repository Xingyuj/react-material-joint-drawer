const system = (state = {}, action) => {
  switch (action.type) {
    case 'SYSTEM_SINGLE_INPUT':
      return {
        ...state,
        [action.field]: action.value
      };
    default:
      return state;
  }
};

export default system;
