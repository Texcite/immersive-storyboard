import { GlobalContext } from '@/context/globalContext';
import * as React from 'react';
import {LayoutProps} from "@/layouts/base";
import {FC, ReactElement, useContext} from "react";

export const useGlobalContext = () => useContext(GlobalContext)


const GlobalAppProvider = ({children}:LayoutProps ) => {


    // Global states
    const [title, setTitle] = React.useState<string>('dashboard');

    return (
        <GlobalContext.Provider value={
            { title: title, setTitle: setTitle }
        }>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalAppProvider;