import React, { useEffect } from 'react';
import { Contract } from '@ethersproject/contracts';
import { utils } from 'ethers';
import { useContractCall, useEtherBalance, useEthers, library } from '@usedapp/core';

import MetacardAbi from '../abi/Metacard_abi.json';


const metacardInterface = new utils.Interface(MetacardAbi);
const metacardAddress = '0xe9c29E391D34e0c1B4Da99B477833c43212dd9D6';

let AirdropContract;


const ContractInteraction = () => {
  const { account, library } = useEthers();


  if (library !== undefined) {
    AirdropContract = new Contract(
      metacardAddress,
      MetacardAbi,
      library.getSigner()
    )
  }



  return (
    <div>

      <div 
      // onClick={() => {AirdropContract['deposit'](0).then((v)=>{
      //   console.log(v)
      // })}}
      >
        haha
      </div>
    </div>
  )

}

export default ContractInteraction
