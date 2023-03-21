import {LayoutProps} from "@/layouts/base";
import {classNames} from "@/utils/classNames";
import {useState} from "react";


const apiKey = process.env.NEXT_PUBLIC_APIKEY;
const apiUrl = 'https://api.replicate.com/v1/predictions';

export default function BuilderLayout({children}: LayoutProps){
    

    function timeout(delay: number) {
        return new Promise( res => setTimeout(res, delay) );
    }

    async function getPrediction() {
        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${apiKey}`,
            'mode': 'no-cors',
          },
          body: JSON.stringify({
            'version': 'e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6',
            'input': {
              'max_frames': '100'
            }
          })
        });
      
        const data = await response.json();

        await timeout(480000);

        const secondUrl = apiUrl + '/' + data.id;

        const secondResponse = await fetch(secondUrl, {
            method: 'GET',
            headers: {
              'Authorization': `Token ${apiKey}`,
              'Content-Type': 'application/json'
            }
          });

          const complete = await secondResponse.json();

          const formattedData = {
            id: complete.id,
            input: complete.input,
            output: complete.output,
            status: complete.status
          };

          console.log(formattedData); // or do something else with the formatted data 
          
          return (
            formattedData.output
            );
        }

       

function backHandler(){
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


return (
    <div>
        <button className='flex flex-col items-center justify-center rounded-3xl border-blue-400 h-10 w-16 border-2' onClick={backHandler}>
            Back
        </button>
     
      <button className='flex flex-col items-center justify-center rounded-3xl border-blue-400 h-10 w-38 border-2' onClick={handleButtonClick}>Get Prediction</button>
      {prediction && <pre>{JSON.stringify(prediction, null, 2)}</pre>}
    </div>
);
}


