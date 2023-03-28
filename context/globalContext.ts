import * as React from "react";
import {Panel} from "@/components/timeline/panel";
import {Dispatch} from "react";

interface GlobalContextProps {
    title: string
    setTitle: React.Dispatch<string>
    panels: Array<Panel>
    setPanels: Dispatch<Array<Panel>>
    openSceneBuilder: boolean
    setOpenSceneBuilder: Dispatch<boolean>
}

export const GlobalContext = React.createContext<GlobalContextProps | undefined>(undefined);
