import {useState} from "react";

interface PanelProps {
    children: (selTab: string) => React.ReactNode;
    onTabClick: (tab: string) => void;
    shadow?: 'yellow' | 'orange';
}

const LeaderboardPanel = (props: PanelProps) => {
    const [selTab, setSelTab] = useState<string>('Monthly');

    const shadowColour = {
        yellow: 'lg:shadow-3xl lg:shadow-pt-yellow',
        orange: 'lg:shadow-3xl lg:shadow-pt-orange'
    }

    const handleTabClick = (tab: string) => {
        setSelTab(tab);
        props.onTabClick(tab);
    };

    return (
        <div className={'min-w-[35%] mx-auto'}>
            <div className="flex w-3/4">
                <div onClick={() => handleTabClick('Weekly')}
                     className={`cursor-pointer border-b-0 ml-7 grid bg-pt-yellow ${selTab === 'Monthly' && 'bg-pt-selected-tab'} rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3 p-1`}>
                    <h1 className="text-pt-offwhite self-center m-auto text-sm text-ellipsis drop-shadow-text">Weekly</h1>
                </div>
                <div onClick={() => handleTabClick('Monthly')}
                     className={`cursor-pointer border-b-0 grid bg-pt-orange ${selTab === 'Weekly' && 'bg-pt-selected-tab'} rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3 p-1`}>
                    <h1 className="text-pt-offwhite self-center m-auto drop-shadow-text">Monthly</h1>
                </div>
                <div onClick={() => handleTabClick('Lifetime')}
                     className={`cursor-pointer border-b-0 mr-7 grid bg-pt-brown ${selTab === 'Lifetime' && 'bg-pt-selected-tab'} rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3 p-1 self-center`}>
                    <h1 className="text-pt-offwhite self-center m-auto drop-shadow-text">Lifetime</h1>
                </div>
            </div>
            <div
                className={`bg-pt-offwhite rounded-[30px] pl-4 pr-8 pb-8 pt-4 border-6 border-pt-brown min-h-[30rem] min-w-[23rem] ${props.shadow ? shadowColour[props.shadow] : ''}`}>
                {props.children(selTab)}
            </div>
        </div>
    );
};
export {LeaderboardPanel}