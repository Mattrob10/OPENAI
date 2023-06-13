// App.js
import React, { useState } from "react";
import Logo from "./assests/chatgpt-48.png";
import SpinnerImage from "./css/spinner.css";
import Modal from "./components/modal";
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [imageUrls, setImageUrls] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImageUrl, setSelectedImageUrl] = useState("");

  async function onSubmit(e) {
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

    try {
      showSpinner();

      const API_URL = '/openai/generateimage';
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPEN_API_KEY}`,
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
        setImageUrls(imageUrls);
      } else {
        throw new Error('No images available');
      }

      removeSpinner();
    } catch (error) {
      const msgElement = document.querySelector('.msg');
      if (msgElement) {
        msgElement.textContent = error.message; 
      }
      setErrorMessage(error.message);
      removeSpinner();
    }
  }

  function displayImages(imageUrls) {
    return imageUrls.map((imageUrl) => (
      <div className="image" key={uuidv4()}>
        <img src={imageUrl} alt={prompt.value} />
        <button onClick={() => openModal(imageUrl)}>
          Open Image
        </button>
      </div>
    ));
  }

  function openModal(imageUrl) {
    setSelectedImageUrl(imageUrl);
  }

  function closeModal() {
    setSelectedImageUrl("");
  }

  function showSpinner() {
    document.querySelector('.spinner').classList.add('show');
  }

  function removeSpinner() {
    document.querySelector('.spinner').classList.remove('show');
  }

  return (
    <div className="App">
      <header>
        <div className="navbar">
          <div className="logo">
            <img src={Logo} alt="logo" id="logo" />
          </div>
          <div className="nav-links">
            <ul>
              <li>
                <a
                  href="https://beta.openai.com/docs"
                  target="_blank"
                  rel="noreferrer"
                >
                  OpenAI API Docs
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>
      <main>
        <section className="showcase">
          <h1>Describe An Image</h1>
          <form id="image-form" onSubmit={onSubmit}>
            <div className="form-control">
              <input type="text" id="prompt" placeholder="Enter Text" />
            </div>
            <div className="form-control">
              <select name="size" id="size" defaultValue="medium">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </div>
            <button type="submit" className="btn">
              Generate
            </button>
          </form>
        </section>
        <section className="image">
          <div className="image-container">
            <div className="msg">{errorMessage}</div>
            {imageUrls.length > 0 ? (
              displayImages(imageUrls)
            ) : (
              <img src="" alt="" id="image" />
            )}
          </div>
        </section>
        <footer>made by matthew</footer>
      </main>
      <div
        className="spinner"
        style={{
          backgroundImage: `url(${SpinnerImage})`
        }}
      ></div>
      {selectedImageUrl && (
        <Modal imageUrl={selectedImageUrl} closeModal={closeModal} />
      )}
    </div>
  );
}

export default App;
