import fetch from 'node-fetch';

const apiUrl = 'https://api.replicate.com/v1/predictions';
const authToken = '';
const headers = {
  'Authorization': `Token ${authToken}`,
  'Content-Type': 'application/json'
};

const requestBody = {
  version: 'e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6',
  input: {
    max_frames: '30'
  }
};

fetch(apiUrl, {
  method: 'POST',
  headers,
  body: JSON.stringify(requestBody),
})
.then(response => response.json())
.then(data => {
  console.log(data); // Do something with the response data
})
.catch(error => {
  console.error(error); // Handle any errors that occur during the request
});