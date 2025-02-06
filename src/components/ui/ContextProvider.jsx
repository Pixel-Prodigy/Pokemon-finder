import React, { useState } from "react";
import { Context } from "./Context";

export function ContextProvider({ children, fetchData }) {
  const [show, setShow] = useState(false);
  const toggleShow = () => setShow(!show);
  const [searchNames, setSearchNames] = useState("");
  return (
    <Context.Provider
      value={{
        toggleShow,
        show,
        fetchData,
        searchNames,
        setSearchNames,
      }}
    >
      {children}
    </Context.Provider>
  );
}
