import { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import { Dispatch, FC, ReactElement } from "react";
import { useState } from "react";
import Options from "@/components/form/options";
import { Panel } from "@/components/timeline/panel";
import { useGlobalContext } from "@/providers/GlobalContextProvider";
import { LoadingScreen } from "@/components/loading";
import { startTimeout } from "@/utils/timeout";
import { log } from "console";

const SceneBuilder: NextPageWithLayout = ({ }) => {
    const apiKey = process.env.NEXT_PUBLIC_APIKEY;
    const apiUrl = 'https://api.replicate.com/v1/predictions';
    const [formattedData, setFormattedData] = useState({ id: null, input: null, output: null, status: null });
    const [loading, setLoading] = useState(false)
    // @ts-ignore
    const { setPanels } = useGlobalContext()


    /**
     * Creates new timeout
     * @param delay
     */
    function timeout(delay: number) {
        return new Promise(res => setTimeout(res, delay));
    }



    /**
     * Scene builder page component
     * @constructor
     */
    const SceneBuilderPage: FC<{ setLoading: Dispatch<boolean> }> = ({ setLoading }) => {
        /**
         * Fetches new video result with prompt
         */
        async function getPrediction() {
            const panel = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${apiKey}`,
                    'mode': 'no-cors'
                },
                body: JSON.stringify({
                    'version': 'e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6',
                    'input': {
                        'max_frames': 100,
                        'animation_prompts': "0: " + panelOptions.description + ", in a " + panelOptions.style + " art style, from a " + panelOptions.POV + " POV",
                        'translation_y': '0: (0)',
                        'translation_x': '0: (0)',
                        'angle': "0: (0)",
                        'zoom': '0: (1)',

                    }
                })
            }).then((res) => res.json())
                .then(async (data) => {
                    await startTimeout(330000)
                    return data
                })
                .then((data) => fetch(apiUrl + '/' + data.id, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Token ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                }))
                .then((res) => res.json())
                .then((complete) => {
                    setFormattedData({
                        id: complete.id,
                        input: complete.input,
                        output: complete.output,
                        status: complete.status
                    })
                    console.log(formattedData, complete)
                    const panel: Panel = {
                        id: complete.id,
                        thumbnail: complete.output,
                        video: complete.output,
                        title: panelOptions.title,
                        comments: panelOptions.comment
                    }
                    return panel
                });
            return panel
        }


        /**
         * Redirect callback function
         */
        function backHandler() {
            window.location.href = '/timeline';
        }

        const handleButtonClick = async () => {
            try {
                setLoading(true)
                const panel = await getPrediction();
                setPanels((panels: Panel[]) => panels.push(panel))
                setLoading(false)
            } catch (error) {
                console.error(error);
                setLoading(false)
            }
        };


        const [panelOptions, setPanelState] = useState({
            title: "",
            comment: "",
            description: "",
            style: "realistic",
            zoom: {
                translation_x: "0",
                translation_y: "0",
                zoom: "1.04",
            },
            POV: "first person"
        });

        /**
         * Changes the state of Panel Object
         * @param newObject
         */
        function changePanelState(newObject: any) {
            var x
            var y
            var zoom
            if (!newObject.zoom) {
                x = panelOptions.zoom.translation_x
                y = panelOptions.zoom.translation_y
                zoom = panelOptions.zoom.zoom
            } else {
                x = newObject.zoom.translation_x
                y = newObject.zoom.translation_y
                zoom = newObject.zoom.zoom
            }


            setPanelState({
                title: newObject.title || panelOptions.title,
                description: newObject.description || panelOptions.description,
                comment: newObject.comment || panelOptions.comment,
                style: newObject.style || panelOptions.style,
                zoom: {
                    translation_x: x || panelOptions.zoom.translation_x,
                    translation_y: y || panelOptions.zoom.translation_y,
                    zoom: zoom || panelOptions.zoom.zoom,

                },
                POV: newObject.POV || panelOptions.POV
            });

        }

        return (<div className="h-screen">
            <div className="flex flex-row h-full divide-x divide-solid">

                <div id="promptscreen"
                    className="overflow-hidden basis-1/2 bg-gray-100 px-14 h-full flex items-start flex-col justify-center space-y-6">

                    <label htmlFor="description" className="block text-5xl font-bold text-gray-900 pt-6">Result
                        prompt:</label>
                    <p className="text-sm4 text-gray-600">See what your prompt looks like.</p>

                    <p className="text-4xl font-semibold leading-20">
                        I want to create a video of <span
                            className="text-sky-500"> {panelOptions.description || "Please fill in the 'your scene' field"} </span>
                        in the style of <span className="text-sky-500"> {panelOptions.style} </span>.
                        The camera will have a <span className="text-sky-500"> {panelOptions.POV} </span> perspective.
                    </p>

                    <button
                        className='flex flex-col items-center justify-center rounded-3xl bg-sky-500 text-gray-50 h-10 w-40 border-2 mt-4'
                        onClick={handleButtonClick}>Generate panel
                    </button>


                </div>


                <div id="promptOptions" className="overflow-hidden overflow-y-scroll basis-1/2 bg-gray-50 pb-16 px-14">

                    <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Storyboard
                        title:</label>
                    <p className="text-sm py-2">
                        Add a title to your storyboard panel to recognize your scene in the timeline.
                    </p>
                    <input
                        id="title"
                        type="text"
                        placeholder="Enter a title..."
                        onChange={(e) => changePanelState({ title: e.target.value })}
                        className="block p-2.5 w-full text-sm bg-gray-200 placeholder-black"
                    />

                    <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Comment:</label>
                    <p className="text-sm py-2">
                        Add a title to your storyboard panel to recognize your scene in the timeline.
                    </p>
                    <input
                        id="title"
                        type="text"
                        placeholder="Add an optional comment for storyboard panel..."
                        onChange={(e) => changePanelState({ comment: e.target.value })}
                        className="block p-2.5 w-full text-sm bg-gray-200 placeholder-black"
                    />


                    <label htmlFor="description" className="block text-xl font-bold text-gray-900 pt-6">Your
                        scene:</label>
                    <textarea
                        id="description"
                        rows={4}
                        className="block p-2.5 w-full text-sm bg-gray-200 placeholder-black"
                        placeholder="Describe the scene you want to create..."
                        onChange={(e) => changePanelState({ description: e.target.value })}
                    />
                    <label className="pt-6 block mb-2 text-xl font-bold text-gray-900">Style:</label>
                    <p className="font-medium text-lg text-gray-900">Choose the art-style for your scene.</p>
                    <Options
                        availableOptions={styleList}
                        stateVariable="style"
                        changeSelected={changePanelState}
                    />
                    <label className="pt-6 block mb-2 text-xl font-bold text-gray-900 ">POV:</label>
                    <p className="font-medium text-lg text-gray-900">Choose a camera point of view for your</p>
                    <Options
                        availableOptions={POVList}
                        stateVariable="POV"
                        changeSelected={changePanelState}
                    />

                    {formattedData !== null && formattedData.output ? (
                        <video controls>
                            <source src={formattedData.output} type="video/mp4" />
                        </video>
                    ) : null}
                </div>
            </div>
        </div>)
    }
    /**
     * Conditional returning the loading page or scene builder page
     */
    return (
        loading ? <LoadingScreen /> : <SceneBuilderPage setLoading={setLoading} />
    )
}

export default SceneBuilder

var baseClasses = 'rounded bg-gray-800 text-gray-50 hover:bg-sky-500 hover:cursor-pointer border-sky-500 border-2 p-2 text-center max-h-12 w-fit'
var baseSelectedClass = 'rounded bg-sky-500 text-gray-50 hover:bg-sky-500 hover:cursor-pointer border-sky-500 border-2 p-2 text-center max-h-12 w-fit'

var styleList = {

    options: [

        {
            name: 'Realistic',
            value: 'realistic',
            classes: baseSelectedClass,
        },
        {
            name: 'Cinematic',
            value: 'Cinematic',
            classes: baseClasses
        },
        {
            name: 'Lost',
            value: 'lost',
            classes: baseClasses,
        },
        {
            name: 'Entergelactic',
            value: 'Entergelactic',
            classes: baseClasses,
        },
        {
            name: 'Art Nouveau',
            value: 'Art Nouveau',
            classes: baseClasses,
        },
        {
            name: '3D render',
            value: '3D render',
            classes: baseClasses,
        },
        {
            name: 'Oil Painting',
            value: 'Oil Painting',
            classes: baseClasses,
        },
        {
            name: 'Steam-punk',
            value: 'Steam-punk',
            classes: baseClasses,
        },
        {
            name: 'B&W Film',
            value: 'B&W Film',
            classes: baseClasses,
        },
    ]
}

var POVList = {

    options: [

        {
            name: 'First Person',
            value: 'First Person',
            classes: baseSelectedClass,
        },
        {
            name: 'Third Person',
            value: 'Third Person',
            classes: baseClasses,
        },
        {
            name: 'Top-Down',
            value: 'Top-Down',
            classes: baseClasses,
        },
        {
            name: 'Bottom-Up',
            value: 'Bottom-Up',
            classes: baseClasses,
        },
    ]
}