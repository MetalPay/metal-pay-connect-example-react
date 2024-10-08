import logo from './logo.svg';
import { useRef, useEffect, useState } from 'react'  
import './App.css';
import { MetalPayConnect } from 'metal-pay-connect-js'

function App() {

  const metalPayConnectEl = useRef()
  const [config, setConfig] = useState(null);

  useEffect(() => {
    // Fetch the API key, signature, and nonce from the server
    fetch(`${process.env.REACT_APP_BACKEND_API_BASE_URL}/v1/signature`)
      .then(response => response.json())
      .then(data => {
        setConfig({
          apiKey: data.apiKey,
          signature: data.signature,
          nonce: data.nonce
        });
      })
      .catch(error => console.error('Error fetching signature:', error));
  }, []);

  useEffect(() => {
    if (config) {
      // Initialize the SDK with configuration options
      const metalPayConnect = new MetalPayConnect({
        el: metalPayConnectEl.current,
        environment: 'dev', //type Environment = 'preview' | 'dev' | 'prod'
        params: {
          apiKey: config.apiKey,
          signature: config.signature,
          nonce: config.nonce,
          address: { 'xpr-network': 'johndoe' }, // address for the user
          networks: ['xpr-network'], // List of networks to enable
        }
      })
  
      return () => {
        // Cleanup the SDK
        metalPayConnect.destroy()
      }
    }
  }, [config])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div className="App-body">
        <div id="metal-pay-connect" class="flex w-full items-center justify-center">
        </div>
      </div>
    </div>
  );
}

export default App;
