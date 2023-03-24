export{}

const apiKey = '';
const apiUrl = 'https://api.replicate.ai/stable-diffusion/predictions';

async function getPrediction(): Promise<any> {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Token ${apiKey}`,
    },
    body: JSON.stringify({
      'version': 'e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6',
      'input': {
        'max_frames': '30'
      }
    })
  });

  const data = await response.json();

  return data;
}

getPrediction().then((data) => {
  console.log(data);
}).catch((error) => {
  console.error(error);
});