// FUNCION PARA CREAR FORMATO DE FECHA SEGUN MOCK
export const dateFormat = (receivedDate) => {
  let fullDateArray = receivedDate.split(',');
  let dateArray = fullDateArray[0].split('/');

  let day, month;

  switch (true) {
    case dateArray[0].length !== 2 && dateArray[1].length !== 2:
      day = dateArray[0].padStart(2, '0');
      month = dateArray[1].padStart(2, '0');
      break;
    case dateArray[0].length !== 2:
      day = dateArray[0].padStart(2, '0');
      month = dateArray[1];
      break;
    case dateArray[1].length !== 2:
      day = dateArray[0];
      month = dateArray[1].padStart(2, '0');
      break;
    default:
      day = dateArray[0];
      month = dateArray[1];
      break;
  }

  let newFormat = dateArray[2]
    .concat('-', month)
    .concat('-', day)
    .concat('', fullDateArray[1]);

  return newFormat;
};
