import {GlobalContext} from '@/context/globalContext';
import * as React from 'react';
import {LayoutProps} from "@/layouts/base";
import {FC, ReactElement, useContext, useState} from "react";
import {Panel} from "@/components/timeline/panel";

export const useGlobalContext = () => useContext(GlobalContext)


const GlobalAppProvider = ({children}: LayoutProps) => {


    // Global states
    const [title, setTitle] = React.useState<string>('dashboard');
    const [panels, setPanels] = useState<Array<Panel>>([
        {
            id: "sd342ferg1231",
            title: 'Panel 1',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/b2491cb9-5863-4b47-b0f0-40e9af1c2565/out.mp4',
            comments: "Comments",
        },
        {
            id: "panelqq111",
            title: 'Panel 2',
            thumbnail: 'https://ple1.nigelritfeld.nl/concept/signing-contract.jpeg',
            video: 'https://replicate.delivery/mgxm/08e3a2d5-4594-4934-a34a-6e249744ee52/out.mp4',
            comments: "Comments",
        }
    ])
    let [openSceneBuilder, setOpenSceneBuilder] = useState(false)



    return (
        <GlobalContext.Provider value={
            {
                title: title,
                setTitle: setTitle,
                panels, setPanels,
                openSceneBuilder, setOpenSceneBuilder
            }
        }>
            {children}
        </GlobalContext.Provider>
    );
};

export default GlobalAppProvider;