import React from 'react';
import { createContext } from 'react';

// create context
export const FoodContext = createContext();
export const FoodProvider = FoodContext.Provider;
//  initialize useContext as useFooditerms so as to consume it on other components
export const useFooditerms = () => {
  return React.useContext(FoodContext);
};