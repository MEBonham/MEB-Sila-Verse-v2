import React from 'reactn';

const PptTotalsContext = React.createContext();

export const PptTotalsProvider = PptTotalsContext.Provider;
export const PptTotalsConsumer = PptTotalsContext.Consumer;
export default PptTotalsContext;