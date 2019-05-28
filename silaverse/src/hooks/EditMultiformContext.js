import React from 'reactn';

const EditMultiformContext = React.createContext();

export const EditProvider = EditMultiformContext.Provider;
export const EditConsumer = EditMultiformContext.Consumer;
export default EditMultiformContext;