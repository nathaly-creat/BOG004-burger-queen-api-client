// IMPORTACION HOOK useState
import { useState } from 'react';

// CUSTOM HOOK PARA FORMULARIOS
export const useFormCustHook = (initialState = {}) => {
  // estructura de hook para cambio en inputs de form
  const [formValues, setFormValues] = useState(initialState);

  // funcion para manejo de cambio de inputs
  const handleInputChange = ({ target }) => {
    setFormValues({
      ...formValues, // copia de valores iniciales de formValues
      [target.name]: target.value,
    });
  };

  // retorno de valores para form y f para manejar su cambio
  return [formValues, handleInputChange];
};
