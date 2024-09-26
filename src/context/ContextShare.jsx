import React, { createContext, useState } from "react";

export const addResponseContext = createContext({});
export const editResponseContext = createContext({});
export const getResponseContext = createContext({});

function ContextShare({ children }) {
  const [addResponse, setAddResponse] = useState({});
  const [editResponse, setEditResponse] = useState({});
  const [getResponse, setGetResponse] = useState({});

  return (
    <div>
      <addResponseContext.Provider value={{ addResponse, setAddResponse }}>
        <editResponseContext.Provider value={{ editResponse, setEditResponse }}>
          <getResponseContext.Provider value={{ getResponse, setGetResponse }}>
            {children}
          </getResponseContext.Provider>
        </editResponseContext.Provider>
      </addResponseContext.Provider>
    </div>
  );
}

export default ContextShare;
