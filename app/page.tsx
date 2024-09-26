'use client'
import Image from "next/image";
import {Panel} from "./Components/Panel/";
import {BeerGlass} from "./Components/BeerGlass";
import './beerglass.scss'
import React, {useEffect, useState} from 'react';
import {Button} from "./Components/Button";
import {Modal} from "./Components/Modal";
import {useAuth} from "@/app/AuthProvider";
import {addPintToHistory} from "@/app/firebase/firebaseUtils";
import {BeerData} from "@/app/Common/BeerCommon";
import Papa from 'papaparse';
import {Loading} from "@/app/Components/Loading";

export default function Home() {

    const [showModel, setShowModel] = useState(false);
    const [pint, setPint] = useState<BeerData>();
    const [data, setData] = useState<BeerData[]>([]);
    const [input, setInput] = useState<string>('');
    const [suggestions, setSuggestions] = useState<BeerData[]>([]);
    const {currentUser, loading} = useAuth();

    useEffect(() => {
        fetch('/beer_profile_and_ratings.csv')
            .then(response => response.text())
            .then(csvData => {
                Papa.parse<BeerData>(csvData, {
                    header: true,
                    dynamicTyping: true,
                    skipEmptyLines: true,
                    complete: (results) => {
                        setData(results.data as BeerData[]);
                    }
                });
            })
            .catch(error => console.error('Failed to load CSV:', error));
    }, []);

    const handleClick = () => {
        setShowModel(true);
    };

    const handleCloseModal = () => {
        setShowModel(false);
        setInput('')
    };


    if (loading) {
        return <Loading/>;
    }

    {
        !currentUser ? window.location.href = '/login' : null
    }

    const handleSuggestionClick = (beer: BeerData) => {
        setInput(beer.name);
        setPint(beer)
        setSuggestions([]);
    };

    const handleAddPint = async (event: React.FormEvent) => {
        event.preventDefault();
        currentUser?.email && pint ?
            (await addPintToHistory(currentUser?.email, pint)) : null
        window.location.reload()
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setInput(value);
        if (!value) {
            setSuggestions([]);
        } else {
            const matchedSuggestions = data.filter(beer =>
                beer.name.toString().toLowerCase().includes(value.toLowerCase())
            );
            setSuggestions(matchedSuggestions);
        }
    };

    return (
        <main className="flex lg:min-h-screen flex-col items-center justify-between p-5 lg:p-20">
            <h1 className="lg:text-5xl text-xl">Your place for everything <span className="underline">pints</span>.</h1>

            <div className="flex flex-col lg:flex-row lg:space-x-20 lg:mt-10 mt-4 w-[95%] lg:w-auto">
                <Panel width={"extralarge"} shadow={"orange"} padding={'6'}>
                    <div className={'text-center'}>
                        <h5 className="lg:mb-4 lg:text-4xl text-2xl font-bold tracking-tight dark:text-white truncate">Your
                            monthly goal is</h5>
                        <h2 className="font-bold text-pt-brown text-2xl lg:mb-6 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-pt-yellow m-auto">
                            <span className="lg:text-6xl text-4xl">32</span> pints
                        </h2>
                        <h5 className="lg:mb-2 lg:text-4xl text-2xl  font-bold tracking-tight dark:text-white m-auto">You've
                            tackled</h5>
                        <span
                            className="lg:text-6xl text-4xl text-pt-brown font-bold lg:mb-4 drop-shadow-[2px_2px_var(--tw-shadow-color)] shadow-pt-yellow m-auto">100%</span>
                        <h2 className="font-bold text-pt-brown text-2xl mb-10 m-auto">of your monthly goal</h2>

                        <div className={''}>
                            <BeerGlass/>
                        </div>
                    </div>
                </Panel>
            </div>

            <Button handleClick={handleClick}>
                I've drank a pint! <Image src={'/pint.svg'} alt={'Pint Logo'} className="mx-2" height={30} width={30}/>
            </Button>

            {showModel && <Modal width={'medium'} onClose={handleCloseModal}>
                <div className="mt-2">
                    <h1 className="text-5xl md:text-6xl">Add a Beer!</h1>
                    <label className="block text-sm font-medium leading-6 pt-brown">Brand/Name</label>
                    <form onSubmit={handleAddPint}>
                        <input type="text" value={input} onChange={handleChange} placeholder="Search..."
                               className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-2 ring-pt-brown text-center  ">
                        </input>

                        <ul className={'max-h-[100px] overflow-y-scroll'}>
                            {suggestions.map((item, index) => (
                                <li key={index} onClick={() => handleSuggestionClick(item)}>
                                    {item.name}
                                </li>
                            ))}
                        </ul>

                        <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 w-1/3 mt-5"
                                type={'submit'}>
                            Add Pint
                        </button>
                    </form>
                </div>

            </Modal>}

        </main>
    )
}