import { NextPageWithLayout } from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import { ReactElement } from "react";
import { useState } from "react";
import Options from "@/components/form/options";

const SceneBuilder: NextPageWithLayout = ({ }) => {
  const apiKey = process.env.NEXT_PUBLIC_APIKEY;
  const apiUrl = 'https://api.replicate.com/v1/predictions';
  const [formattedData, setFormattedData] = useState({ id: null, input: null, output: null, status: null });
  const [inputValue, setInputValue] = useState("");
  const [prediction, setPrediction] = useState(null);
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

  /**
   * Creates new timeout
   * @param delay
   */
  function timeout(delay: number) {
    return new Promise(res => setTimeout(res, delay));
  }

  /**
   * Fetches new video result with prompt
   */
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
          'animation_prompts': "0: " + panelOptions.description + ", in a " + panelOptions.style + " art style, from a " + panelOptions.POV + " POV",
          'translation_y': `0: (${panelOptions.zoom.translation_y})`,
          'translation_x': `0: (${panelOptions.zoom.translation_x})`,
          'angle': "0: (0)",

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

  /**
   * Redirect callback function
   */
  function backHandler() {
    window.location.href = '/timeline';
  }

  const handleButtonClick = async () => {
    try {
      const data = await getPrediction();
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>

      <div className="flex flex-row divide-x-2 relative">
        <div id="promptscreen" className="basis-1/2 bg-gray-50 p-1 rounded-lg pl-64 pr-16 pt-2 overflow-hidden max-h-screen min-h-screen sticky">

          <div className="relative border-b-2 focus-within:border-blue-500">

            <div className="flex gap-3">
              <svg width="28" height="30" viewBox="0 0 28 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.498047 23.3125V29.25H6.12305L22.713 11.7383L17.088 5.80083L0.498047 23.3125ZM4.87805 26.0833H3.49805V24.6267L17.088 10.2817L18.468 11.7383L4.87805 26.0833ZM27.063 4.91417L23.553 1.20917C23.253 0.8925 22.878 0.75 22.488 0.75C22.098 0.75 21.723 0.908333 21.438 1.20917L18.693 4.10667L24.318 10.0442L27.063 7.14667C27.648 6.52917 27.648 5.53167 27.063 4.91417Z" fill="black" />
              </svg>

              <input type="text" name="username" placeholder="Untitled scene" className="block w-full appearance-none focus:outline-none bg-transparent" />

            </div>


          </div>

          <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Scene title:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a title for your scene..."
            onChange={(e) => changePanelState({ title: e.target.value })}
            className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
          />
          <label htmlFor="title" className="block text-xl font-bold text-gray-900 pt-6">Scene caption:</label>
          <input
            id="title"
            type="text"
            placeholder="Enter a caption for your scene..."
            onChange={(e) => changePanelState({ comment: e.target.value })}
            className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
          />
          <label htmlFor="description" className="block text-xl font-bold text-gray-900 pt-6">Your generation
            prompt:</label>
          <textarea
            id="description"
            readOnly={true}
            rows={4}
            className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
            value={`I want to create a video of <${panelOptions.description || "Please fill in the 'your scene' field"}> in the style of <${panelOptions.style}>. The camera will have a <${panelOptions.POV}> perspective`}
          />
          <button
            className='justify-center rounded-3xl text-sky-500 h-10 w-16 border-sky-500 border-2 hover:bg-sky-500 hover:text-gray-50 bg-gray-50 absolute bottom-0 left-0 ml-64 mb-2'
            onClick={backHandler}>
            Back
          </button>
        </div>

        <div id="promptOptions" className="basis-1/2 bg-gray-50 p-1 rounded-lg pr-64 pl-16 pt-2 overflow-scroll">
          <label htmlFor="description" className="block text-xl font-bold text-gray-900 pt-6">Your
            scene:</label>
          <textarea
            id="description"
            rows={4}
            className="block p-2.5 w-full text-sm placeholder-gray-600 text-gray-900 bg-gray-300 rounded-lg border border-gray-300 focus:ring-sky-500 focus:border-sky-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-800 dark:text-white dark:focus:ring-sky-500 dark:focus:border-sky-500"
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
          <p className="font-medium text-lg text-gray-900">Choose a direction the camera will zoom
            towards.</p>
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
          <button
            className='flex flex-col items-center justify-center rounded-3xl bg-sky-500 text-gray-50 h-10 w-40 border-2 mt-4'
            onClick={handleButtonClick}>Create scene
          </button>
          {prediction && <pre>{JSON.stringify(prediction, null, 2)}</pre>}
          {formattedData !== null && formattedData.output ? (
            <video controls>
              <source src={formattedData.output} type="video/mp4" />
            </video>
          ) : null}
        </div>

      </div>


    </div>)

}

SceneBuilder.getLayout = function (page: ReactElement) {

  return <BaseLayout>
    {page}
  </BaseLayout>
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
        translation_x: "5",
        translation_y: "5",
        zoom: "1.04",
      },
      classes: baseSelectedClass,
    },
    {
      name: 'Top-Right-Zoom',
      value: 'Top-Right-Zoom',
      zoom: {
        translation_x: "-5",
        translation_y: "5",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Bottom-Left-Zoom',
      value: 'Bottom-Left-Zoom',
      zoom: {
        translation_x: "5",
        translation_y: "-5",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Bottom-Right-Zoom',
      value: 'Bottom-Right-Zoom',
      zoom: {
        translation_x: "-5",
        translation_y: "-5",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Right-Zoom',
      value: 'Right-Zoom',
      zoom: {
        translation_x: "-5",
        translation_y: "0",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Left-Zoom',
      value: 'Left-Zoom',
      zoom: {
        translation_x: "5",
        translation_y: "0",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Top-Zoom',
      value: 'Top-Zoom',
      zoom: {
        translation_x: "0",
        translation_y: "5",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Bottom-Zoom',
      value: 'Bottom-Zoom',
      zoom: {
        translation_x: "0",
        translation_y: "-5",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Zoom-In',
      value: 'Zoom-In',
      zoom: {
        translation_x: "0",
        translation_y: "0",
        zoom: "1.04",
      },
      classes: baseClasses,
    },
    {
      name: 'Zoom-Out',
      value: 'Zoom-Out',
      zoom: {
        translation_x: "0",
        translation_y: "0",
        zoom: "-1.04",
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