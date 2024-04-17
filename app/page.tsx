'use client'
import Image from "next/image";
import { Panel } from "./Components/Panel";
import BeerGlass from "./Components/BeerGlass";
import './beerglass.scss'
import React, { useState } from 'react';
import { Button } from "./Components/Button";
import { Modal } from "./Components/Modal";

export default function Home() {

  const [showModel, setShowModel] = useState(false);

    const handleClick = () => {
        setShowModel(true);
    };

    const handleCloseModal = () => {
      setShowModel(false);
  };

  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-20">
    <h1 className="text-5xl md:text-6xl">Your place for everything <span className="underline">pints</span>.</h1>
    <div className="flex flex-col space-y-10 md:flex-row md:space-x-20 md:space-y-0 mt-10">

      <div className="flex flex items-center justify-between">
        <Panel width={"extralarge"} shadow={"orange"}>
        <span>
        <h5 className="mb-4 text-4xl font-bold tracking-tight dark:text-white truncate">Your monthly goal is</h5>
        <h2 className="font-bold text-pt-brown text-2xl mb-6 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-pt-yellow"><span className="text-6xl">32</span> pints</h2>
        <h5 className="mb-2 text-4xl font-bold tracking-tight dark:text-white">You've tackled</h5>
        <span className="text-6xl text-pt-brown font-bold mb-4 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-pt-yellow">100%</span>
        <h2 className="font-bold text-pt-brown text-2xl mb-10">of your monthly goal</h2>
        </span>
        <BeerGlass />
        </Panel>
      </div>

      <a href="/mypints"  className="flex flex-col items-center justify-between">
        <Panel width={"extralarge"} shadow={"orange"}>
          <h5 className="mb-2 text-4xl font-bold tracking-tight dark:text-white">MyPints Analytics</h5>
        </Panel>
      </a>
    </div>

    <Button handleClick={handleClick}>
    I've drank a pint! <Image src={'/pint.svg'} alt={'Pint Logo'} className="mx-2" height={30} width={30}/>
    </Button>


    {showModel && <Modal width={'medium'} onClose={handleCloseModal}>
      <h1 className="text-5xl md:text-6xl">Add a Beer!</h1>
          <label className="block text-sm font-medium leading-6 pt-brown">Brand/Name</label>
          <div className="mt-2">
            <input type="text" name="brand-name" id="brand-name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></input>
          </div>
        
      </Modal>}

    </main>
  )
}