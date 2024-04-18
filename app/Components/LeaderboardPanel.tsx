import {useState} from "react";

interface PanelProps {
    children: React.ReactNode;
    onTabClick: (tab: string) => void;
}

const LeaderboardPanel = (props: PanelProps) => {

    const [selTab, setSelTab] = useState<string>('');

    const handleTabClick = (tab: string) => {
        setSelTab(tab);
        props.onTabClick(tab);
    };

    return (
        <div className={'min-w-[35%] mx-auto'}>
            <div className="flex w-3/4">
                <div onClick={() => handleTabClick('Monthly')}
                     className="cursor-pointer border-b-0 ml-7 grid bg-pt-yellow rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3 p-1">
                    <h1 className="text-pt-offwhite self-center m-auto text-sm text-ellipsis drop-shadow-text">Monthly</h1>
                </div>
                <div onClick={() => handleTabClick('Weekly')}
                     className="cursor-pointer border-b-0 grid bg-pt-orange rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3 p-1">
                    <h1 className="text-pt-offwhite self-center m-auto  drop-shadow-text">Weekly</h1>
                </div>
                <div onClick={() => handleTabClick('Lifetime')}
                     className="cursor-pointer border-b-0 mr-7 grid bg-pt-brown rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3 p-1">
                    <h1 className="text-pt-offwhite self-center m-auto  drop-shadow-text">Lifetime</h1>
                </div>
            </div>
            <div
                className={`bg-pt-offwhite rounded-[30px] pl-4 pr-8 pb-8 pt-4 border-6 border-pt-brown min-h-[30rem] shadow-3xl shadow-pt-orange`}>
                {props.children}
            </div>
        </div>
    )
}
export {LeaderboardPanel}