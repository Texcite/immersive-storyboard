import { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import { ReactElement } from "react";
import { useState } from "react";

import Options from "@/components/form/options";


const apiKey = process.env.NEXT_PUBLIC_APIKEY;
const apiUrl = 'https://api.replicate.com/v1/predictions';

const SceneBuilder: NextPageWithLayout = ({ }) => {
  return (
    <>
      <h1>content</h1>
      <h1>Video player</h1>
      <h1>Timeline</h1>
    </>
  )
}

SceneBuilder.getLayout = function (page: ReactElement) {

  const [formattedData, setFormattedData] = useState({ id: null, input: null, output: null, status: null });

  const [panelOptions, setPanelState] = useState({

    title: "test",
    comment: "dit is een test",
    description: "",
    style: "realistic",
    zoom: {
      translation_x: 0,
      translation_y: 0,
      zoom: 1.04,
    },
    perspective: "optie 1",
    POV: "first person"

  });

  function changePanelState(newObject: any) {
    console.log(panelOptions)
var x
var y
var zoom
    if (!newObject.zoom) {
      console.log('test')
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
      perspective: newObject.perspective || panelOptions.perspective,
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
          'animation_prompts': "0: " + panelOptions.description + ", in " + panelOptions.description + " style, from a" + panelOptions.perspective /*+ "POV while performing a" + panelOptions.cameraZoom */,
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
      setPrediction(data);
    } catch (error) {
      console.error(error);
    }
  };


  return <BaseLayout>

    <div>

      <p className="text-6xl font-bold pb-2 bg-gray-800 text-gray-50 pb-16 pt-16 px-64">Scene builder</p>
      <div className="bg-gray-50 p-1 rounded-lg px-64 pt-2">

      <button className='flex flex-col items-center justify-center rounded-3xl bg-blue-400 h-10 w-16 text-gray-50' onClick={backHandler}>
        Back
      </button>

      <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Scene title:</label>
      <input
        id="title"
        type="text"
        placeholder="Enter a title for your scene..."
        onChange={(e) => changePanelState({ title: e.target.value })}
        className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Scene caption:</label>
      <input
        id="title"
        type="text"
        placeholder="Enter a caption for your scene..."
        onChange={(e) => changePanelState({ comment: e.target.value })}
        className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />

      <label htmlFor="description" className="block text-xl font-bold text-gray-900 pt-6">Your scene:</label>
      <textarea
        id="description"
        rows={4}
        className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Describe the scene you want to create..."
        onChange={(e) => changePanelState({ description: e.target.value })}
      />

      <label className="pt-6 block mb-2 text-xl font-bold text-gray-900">Style:</label>
      <p className="font-medium text-lg text-gray-900">Choose the art-style for your scene.</p>
      <Options
        availableOptions={styleList}
        stateVariable="perspective"
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

      <label className="pt-6 block mb-2 text-xl font-bold text-gray-900 ">Generate panel:</label>
      <button className='flex flex-col items-center justify-center rounded-3xl bg-blue-500 text-gray-50 h-10 w-40 border-2 mt-4' onClick={handleButtonClick}>Create scene</button>
      {prediction && <pre>{JSON.stringify(prediction, null, 2)}</pre>}

      {formattedData !== null && formattedData.output ? (
        <video controls>
          <source src={formattedData.output} type="video/mp4" />
        </video>
      ) : null}
      </div>
    </div>

  </BaseLayout>
}

export default SceneBuilder

var baseClasses = 'rounded bg-gray-800 text-gray-50 hover:bg-blue-500 hover:cursor-pointer border-blue-500 border-2 p-2 text-center'
var baseSelectedClass = 'rounded bg-blue-500 text-gray-50 hover:bg-blue-500 hover:cursor-pointer border-blue-500 border-2 p-2 text-center'

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