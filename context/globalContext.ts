import * as React from "react";

interface GlobalContextProps {
    title: string
    setTitle: React.Dispatch<string>
}
export const GlobalContext = React.createContext<GlobalContextProps | null>(null);
