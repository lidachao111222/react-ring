import { useState } from 'react';
import axios from 'axios';
import { useEtherBalance, useEthers } from '@usedapp/core';
import { formatEther } from '@ethersproject/units';
import ContractInteraction from './components/contractInteraction';
import { pinata_api_key, pinata_secret_api_key } from './utils'
import './App.css';

let ringElement;

function App() {

  const [str, setStr] = useState("");

  const [imgdir, setImgdir] = useState("");

  let result;

  const { activateBrowserWallet, account, deactivate, library } = useEthers();
  const etherBalance = useEtherBalance(account);
  const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

  function upload() {
    let data = new FormData();

    data.append('file', new Blob([result], { type: 'svg' }));

    const metadata = JSON.stringify({ name: 'meta-ring', keyvalues: { exampleKey: 'ring' } }); data.append('pinataMetadata', metadata);

    axios.post(url, data, {
      maxBodyLength: 'Infinity',
      headers: { 'Content-Type': `multipart/form-data; boundary=${data._boundary}`, pinata_api_key: pinata_api_key, pinata_secret_api_key: pinata_secret_api_key }
    }).then((val) => {
      console.log(val?.data.IpfsHash)
      console.log("success")
      alert(`success,your hash is ${val?.data.IpfsHash}`)
      setImgdir(`https://gateway.pinata.cloud/ipfs/${val?.data.IpfsHash}`)
    })
  }

  async function create() {
    result = await ringElement.getSvgElement()
    setStr(result)
    console.log(result)
  }

  function createAndUpload() {
    create();
    setTimeout(() => {
      upload();
    }, 1000);
  }

  return (
    <div className="App">
      {/* {console.log(library)} */}
      <ContractInteraction />
      {!account && <button onClick={activateBrowserWallet}> Connect </button>}
      {account && <button onClick={deactivate}> Disconnect </button>}


      {account && <p>Account: {account}</p>}
      {etherBalance && <p>Balance: {formatEther(etherBalance)}</p>}


      <div style={{ width: "400px", margin: "0 auto" }}>

        {imgdir === "" ? <></> : <> success,your image link is  here: <a target="_blank" href={imgdir} rel="noreferrer">{imgdir}</a><img src={imgdir} alt="nft" /></>}
      </div>

      Your creation:
      <div style={{  width: "0",visibility:"hidden" }}>
        <nft-ring ref={(el) => ringElement = el} r-min-ratio=".2" r-max-ratio="1.5" colors="#007F10,#1fE45e,#AEB32E,#6649A6,#FE1777,#fB8F3F,#CB29E3,#4ABBDF,#9839EA,#533874"></nft-ring>
      </div>


      {/* <button onClick={() => { upload() }}>click me!</button> */}
      <button onClick={() => createAndUpload()}>click me!</button>
      <a href={`data:image/svg;xml,${encodeURIComponent(str)}`} download="chaogeshishuaige.svg" >         image is here </a>
    </div>

  );

}

export default App;
