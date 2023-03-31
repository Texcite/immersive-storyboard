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
            title: 'Panel 1',
            thumbnail: '/videos/out-1-thumb.png',
            video: '/videos/out.mp4',
            comments: "Comments",
        },
        {
            id: "panelqq111",
            title: 'Panel 2',
            thumbnail: '/videos/out-2-thumb.png',
            video: '/videos/out-1.mp4',
            comments: "de presentator introduceerd zijn gasten aan het publiek.",
        },
        {
            id: "panelqq111212",
            title: 'Panel 3',
            thumbnail: '/panel-2-thumbnail.png',
            video: '/videos/out-3.mp4',
            comments: "De presentator interviewt 1 van de gasten (militair uniform)",
        },
        {
            id: "panelqq14411",
            title: 'Panel 4',
            thumbnail: '/panel-2-thumbnail.png',
            video: '/videos/out-4.mp4',
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