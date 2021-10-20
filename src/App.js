import { useState } from 'react'
import './App.css';
import axios from 'axios'

let ringElement;

function App() {

  const [str, setStr] = useState(" ");

  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  function upload() {
    let data = new FormData();

    data.append('file', new Blob([str], { type: 'svg' }));

    const metadata = JSON.stringify({ name: 'meta-ring', keyvalues: { exampleKey: 'ring' } }); data.append('pinataMetadata', metadata);

    axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}`, pinata_api_key: "f31938a4d7aa2e4d1b1f", pinata_secret_api_key: "4d7091402d1dab7169f561d4ba68d3977f06d7abcb29d8325e50508183848b85" }
    }).then((val) => {
      console.log(val)
      console.log("success")
    })
  }

  return (
    <div className="App">
      <div style={{ width: "400px", margin: "0 auto" }}>
        <nft-ring ref={(el) => ringElement = el} r-min-ratio=".2" r-max-ratio="1.5" colors="#007F10,#1fE45e,#AEB32E,#6649A6,#FE1777,#fB8F3F,#CB29E3,#4ABBDF,#9839EA,#533874"></nft-ring>
      </div>
      <button onClick={() => { upload() }}>click me!</button>
      <button onClick={async () => setStr(await ringElement.getSvgElement())}>click me!</button>
      <a href={`data:image/svg;xml,${encodeURIComponent(str)}`} download="chaogeshishuaige.svg" >         image is here </a>
      <p> {`data:image/svg;xml,${encodeURIComponent(str)}`} </p>
    </div>
  );

}

export default App;
