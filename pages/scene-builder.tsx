import {NextPageWithLayout} from "@/pages/_app";
import BaseLayout from "@/layouts/base";
import {ReactElement} from "react";
import {useState} from "react";
import DashboardLayout from "@/layouts/DashboardLayout";

const apiKey = process.env.NEXT_PUBLIC_APIKEY;
const apiUrl = 'https://api.replicate.com/v1/predictions';

const SceneBuilder: NextPageWithLayout = ({}) => {
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
    const [inputValue, setInputValue] = useState("");


    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
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
              'animation_prompts': "0: " + inputValue + ", in style",

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

    function backHandler(){
      window.location.href = '/timeline';
    }
  
    const handleButtonClick = async () => {
      try {
        const data = await getPrediction();
      } catch (error) {
        console.error(error);
        }
    };


    return <BaseLayout>
        <DashboardLayout>

        <div>
        <button className='flex flex-col items-center justify-center rounded-3xl border-blue-400 h-10 w-16 border-2' onClick={backHandler}>
          Back
        </button>

        <input
          type="text"
          placeholder="Enter animation prompts"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
              console.log(e.target.value);
            }}
        />
     
        <button className='flex flex-col items-center justify-center rounded-3xl border-blue-400 h-10 w-38 border-2' onClick={handleButtonClick}>Get Prediction</button>


        {formattedData !== null && formattedData.output ? (
          <video controls>
            <source src={formattedData.output} type="video/mp4" />
              </video>
                ) : null}
          </div>

        </DashboardLayout>
    </BaseLayout>
}

export default SceneBuilder