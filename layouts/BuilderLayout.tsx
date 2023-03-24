import { LayoutProps } from "@/layouts/base";
import { classNames } from "@/utils/classNames";
import Button from "@/components/form/button";
import TextInput from "@/components/form/inputField";
import Options from "@/components/form/options";
import { useEffect, useMemo, useState } from "react";

export default function BuilderLayout() {

    const [panelVars, setPanelState] = useState({

        title: "test",
        comment: "dit is een test",
        style: "realistic",
        cameraZoom: "Top-left zoom",
        perspective: "optie 1",
        POV: "first person"


    });

    function changeState(newObject: any){
        setPanelState({
            title: newObject.title || panelVars.title,
            comment: newObject.comment || panelVars.comment,
            style: newObject.style || panelVars.style,
            cameraZoom: newObject.cameraZoom || panelVars.cameraZoom,
            perspective: newObject.perspective || panelVars.perspective,
            POV: newObject.POV || panelVars.POV
        })

    }

    useEffect(() => {
        console.log(panelVars)
    })

    function backHandler() {
        window.location.href = '/timeline';
    }

    return (
        <div>
            <Button buttonType="returnToTimeline" buttonText="back" />

            <h1>The scene:</h1>

            <Options label="label" availableOptions={testList} stateVariable="perspective" changeSelected={changeState} />

        </div>
    );
}

var testList = {

    options: [

    {
        name: 'optie 1',
        value: 'optie_1',
        classes: 'selected rounded bg-blue-500 inline-block',
    },
    {
        name: 'optie 2',
        value: 'optie_2',
        classes: 'rounded bg-blue-500 inline-block',    
    },
    {
        name: 'optie 3',
        value: 'optie_3',
        classes: 'rounded bg-blue-500 inline-block',    
    },
    ]
}


