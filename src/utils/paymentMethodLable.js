 export const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'cash':
        return 'Cash';
      case 'card':
        return 'Card';
      case 'LIPA_NAMBA':
        return 'LIPA_NAMBA';
      default:
        return method;
    }
  };