import {GlobalContext} from '@/context/globalContext';
import * as React from 'react';
import {LayoutProps} from "@/layouts/base";
import {FC, ReactElement, useContext, useState} from "react";
import {Panel} from "@/components/timeline/panel";

export const useGlobalContext = () => useContext(GlobalContext)


const GlobalAppProvider = ({children}: LayoutProps) => {


    // Global states
    const [title, setTitle] = React.useState<string>('dashboard');
    let [openSceneBuilder, setOpenSceneBuilder] = useState(false)
    const [panels, setPanels] = useState<Array<Panel>>([
        {
            id: "sd342ferg1231",
            title: 'Nightmare',
            thumbnail: '/panel-1-thumbnail.png',
            video: 'https://replicate.delivery/mgxm/b2491cb9-5863-4b47-b0f0-40e9af1c2565/out.mp4',
            comments: "Comments",
        },
        {
            id: "panelqq111",
            title: 'Magic realm',
            thumbnail: '/panel-2-thumbnail.png',
            video: 'https://replicate.delivery/mgxm/08e3a2d5-4594-4934-a34a-6e249744ee52/out.mp4',
            comments: "Comments",
        }
    ])



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