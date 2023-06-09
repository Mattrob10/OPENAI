import Logo from "./assests/chatgpt-48.png";
import { onSubmit } from "./js/main"; 
import SpinnerImage from "./css/spinner.css";
function App() {
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
            <div className="msg"></div>
            <img src="" alt="" id="image" />
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
    </div>
  );
}

export default App;
