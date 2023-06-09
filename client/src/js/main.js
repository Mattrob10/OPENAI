
const OPEN_API_KEY = process.env.OPEN_API_KEY;
export function onSubmit(e) {
  e.preventDefault();
 
  document.querySelector('.msg').textContent = '';
  document.querySelector('#image').src = '';

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;
 
  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  generateImageRequest(prompt, size);
}

// this is the issue with allowing others to use app 
const API_URL = '/openai/generateimage'; 
// const API_URL = 'http://localhost:5500/openai/generateimage'; 

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch(API_URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${OPEN_API_KEY}`
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });
    if (!response.ok) {
      removeSpinner();
      throw new Error('That image could not be generated');
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const imageUrl = data.data;
      document.querySelector('#image').src = imageUrl;
    } else {
      throw new Error('No image available');
    }

    removeSpinner();
  } catch (error) {
    document.querySelector('.msg').textContent = error;
  }
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
