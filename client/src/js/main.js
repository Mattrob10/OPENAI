const OPEN_API_KEY = process.env.OPEN_API_KEY;

export async function onSubmit(e) {
  e.preventDefault();

  const msgElement = document.querySelector('.msg');
  if (msgElement) {
    msgElement.textContent = ''; 
  }

  const prompt = document.querySelector('#prompt').value;
  const size = document.querySelector('#size').value;

  if (prompt === '') {
    alert('Please add some text');
    return;
  }

  await generateImageRequest(prompt, size);
}

const API_URL = '/openai/generateimage';

async function generateImageRequest(prompt, size) {
  try {
    showSpinner();

    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPEN_API_KEY}`,
      },
      body: JSON.stringify({
        prompt,
        size,
      }),
    });

    if (!response.ok) {
      removeSpinner();
      throw new Error('The images could not be generated');
    }

    const data = await response.json();

    if (data.data && data.data.length > 0) {
      const imageUrls = data.data;
      displayImages(imageUrls);
    } else {
      throw new Error('No images available');
    }

    removeSpinner();
  } catch (error) {
    const msgElement = document.querySelector('.msg');
    if (msgElement) {
      msgElement.textContent = error; 
    }
  }
}

function displayImages(imageUrls) {
  const imageContainer = document.querySelector('.image-container');
  imageContainer.innerHTML = '';

  imageUrls.forEach((imageUrl) => {
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('image');
    imageContainer.appendChild(imageWrapper);

    const imageElement = document.createElement('img');
    imageElement.src = imageUrl;
    imageElement.alt = 'Generated Image';
    imageWrapper.appendChild(imageElement);

    const openButton = document.createElement('button');
    openButton.textContent = 'Open Image';
    openButton.addEventListener('click', () => {
      window.open(imageUrl, '_blank');
    });
    imageWrapper.appendChild(openButton);
  });
}

function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}

function removeSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}
