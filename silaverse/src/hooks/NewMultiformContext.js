import React from 'reactn';

const NewMultiformContext = React.createContext();

export const NewProvider = NewMultiformContext.Provider;
export const NewConsumer = NewMultiformContext.Consumer;
export default NewMultiformContext;