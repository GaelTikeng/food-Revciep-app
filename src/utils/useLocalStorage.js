import { createContext } from "react";
import React from "react";
import { useEffect, useState } from "react";
// import { useState } from "react";
// custom hook logic
// export function useLocalStorage(key, intialValue) {
//   const [value, setValue] = React.useState(
//     () => JSON.parse(localStorage.getItem(key)) || intialValue
//   );
//   const setLocalStorageValue = (value) => {
//     setValue(() => {
//       if (value) localStorage.setItem(key, JSON.stringify(value));
//       return value;
//     });
//   };
//   // to set local storage
//   useEffect(() => {
//     setLocalStorageValue(value);
//     // refresh local storage each time a new iterm is been added.
//     const refreshStorage = (event) => {
//       if (event.key === key) {
//         setValue(event.newValue);
//       }
//     };
//     window.addEventListener("storage", refreshStorage);
//     return () => {
//       window.removeEventListener("storage", refreshStorage);
//     };
//   }, [key]);
//   return { value, setValue: setLocalStorageValue };
// }
export function useLocalStorage(key, intialValue) {
  const [value, setValue] = React.useState(
    () => JSON.parse(localStorage.getItem(key)) || intialValue
  );
  const setLocalStorageValue = (value) => {
    setValue((prev) => {
      if (!value) {
        return JSON.parse(localStorage.getItem(key)) || intialValue;
      }
      const newData = [...prev, value];
      localStorage.setItem(key, JSON.stringify(newData));
      return [...newData];
    });
  };
  return { value, setValue: setLocalStorageValue };
}