"use client"
import { createContext, useContext, useState } from "react";
import formatDate from "../(tools)/formatdate";

const DateContext = createContext();

export const DateProvider = ({ children }) => {
    const [date, setDate] = useState(formatDate(new Date()))

    return (
        <DateContext.Provider value={{ date, setDate }}>
            {children}
        </DateContext.Provider>
    );
};

export const useDate = () => useContext(DateContext);
