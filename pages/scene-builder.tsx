import { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import { ReactElement } from "react";
import { useState } from "react";

import Options from "@/components/form/options";


const apiKey = process.env.NEXT_PUBLIC_APIKEY;
const apiUrl = 'https://api.replicate.com/v1/predictions';

const SceneBuilder: NextPageWithLayout = ({ }) => {

  const [formattedData, setFormattedData] = useState({ id: null, input: null, output: null, status: null });

  const [panelOptions, setPanelState] = useState({

    title: "",
    comment: "",
    description: "",
    style: "realistic",
    zoom: {
      translation_x: 0,
      translation_y: 0,
      zoom: 1.04,
    },
    POV: "first person"

  });

  function changePanelState(newObject: any) {
    var x
    var y
    var zoom
    if (!newObject.zoom) {
      x = panelOptions.zoom.translation_x
      y = panelOptions.zoom.translation_y
      zoom = panelOptions.zoom.zoom
    }
    else {
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


  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  async function getPrediction() {
    const response = await fetch(apiUrl, {
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
          'animation_prompts': "0: " + panelOptions.description + ", in " + panelOptions.description + " style, from a" + panelOptions.POV /*+ "POV while performing a" + panelOptions.cameraZoom */,
          'translation_y': panelOptions.zoom.translation_y,
          'translation_x': panelOptions.zoom.translation_x,
          'angle': 0,

        }
      })
    });

    const data = await response.json();

    await timeout(330000);

    const secondUrl = apiUrl + '/' + data.id;

    const secondResponse = await fetch(secondUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${apiKey}`,
        'Content-Type': 'application/json'
      }
    });

    const complete = await secondResponse.json();

    setFormattedData({
      id: complete.id,
      input: complete.input,
      output: complete.output,
      status: complete.status
    });

  }

  function backHandler() {
    window.location.href = '/timeline';
  }

  const [prediction, setPrediction] = useState(null);

  const handleButtonClick = async () => {
    try {
      const data = await getPrediction();
    } catch (error) {
      console.error(error);
    }
  };


  return (

    <div className="h-screen">
      <div className="flex flex-row h-full divide-x divide-solid">

        <div id="promptscreen" className="overflow-hidden basis-1/2 bg-gray-100 px-14 h-full flex items-start flex-col justify-center space-y-6">

          <label htmlFor="description" className="block text-5xl font-bold text-gray-900 pt-6">Result prompt:</label>
          <p className="text-sm4 text-gray-600">See what your prompt looks like.</p>

          <p className="text-4xl font-semibold leading-20">
            I want to create a video of <span className="text-sky-500"> {panelOptions.description || "Please fill in the 'your scene' field"} </span> 
            in the style of <span className="text-sky-500"> {panelOptions.style} </span>. 
            The camera will have a <span className="text-sky-500"> {panelOptions.POV} </span> perspective.
          </p>

          <button className='flex flex-col items-center justify-center rounded-3xl bg-sky-500 text-gray-50 h-10 w-40 border-2 mt-4' onClick={handleButtonClick}>Generate panel</button>


        </div>


        <div id="promptOptions" className="overflow-hidden overflow-y-scroll basis-1/2 bg-gray-50 px-14">

          <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Storyboard title:</label>
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
         

          <label htmlFor="description" className="block text-xl font-bold text-gray-900 pt-6">Your scene:</label>
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

          <label className="pt-6 block mb-2 text-xl font-bold text-gray-900 ">Zoom:</label>
          <p className="font-medium text-lg text-gray-900">Choose a direction the camera will zoom towards.</p>
          <Options
            availableOptions={cameraZoomList}
            stateVariable="camaraZoom"
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
    </div>
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

var cameraZoomList = {

  options: [

    {
      name: 'Top-Left-Zoom',
      value: 'Top-Left-Zoom',
      zoom: {
        translation_x: 5,
        translation_y: 5,
        zoom: 1.04,
      },
      classes: baseSelectedClass,
    },
    {
      name: 'Top-Right-Zoom',
      value: 'Top-Right-Zoom',
      zoom: {
        translation_x: -5,
        translation_y: 5,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Bottom-Left-Zoom',
      value: 'Bottom-Left-Zoom',
      zoom: {
        translation_x: 5,
        translation_y: -5,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Bottom-Right-Zoom',
      value: 'Bottom-Right-Zoom',
      zoom: {
        translation_x: -5,
        translation_y: -5,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Right-Zoom',
      value: 'Right-Zoom',
      zoom: {
        translation_x: -5,
        translation_y: 0,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Left-Zoom',
      value: 'Left-Zoom',
      zoom: {
        translation_x: 5,
        translation_y: 0,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Top-Zoom',
      value: 'Top-Zoom',
      zoom: {
        translation_x: 0,
        translation_y: 5,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Bottom-Zoom',
      value: 'Bottom-Zoom',
      zoom: {
        translation_x: 0,
        translation_y: -5,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Zoom-In',
      value: 'Zoom-In',
      zoom: {
        translation_x: 0,
        translation_y: 0,
        zoom: 1.04,
      },
      classes: baseClasses,
    },
    {
      name: 'Zoom-Out',
      value: 'Zoom-Out',
      zoom: {
        translation_x: 0,
        translation_y: 0,
        zoom: -1.04,
      },
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