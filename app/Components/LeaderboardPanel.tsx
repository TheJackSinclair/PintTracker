import { useState } from "react";

interface PanelProps {
    children: React.ReactNode;
    width: 'small' | 'medium' | 'large' | 'extralarge';
    shadow: 'yellow' | 'orange';
    blur?: boolean;
    onTabClick: (tab: string) => void;
}

const LeaderboardPanel = (props: PanelProps) => {

    const [selTab, setSelTab] = useState<string>('');

    const handleTabClick = (tab: string) => {
        setSelTab(tab);
        props.onTabClick(tab);
      };

    const sizeClasses = {
        small: 'w-1/4',
        medium: 'w-1/2',
        large: 'w-3/4',
        extralarge: 'w-full'
    };

    const shadowColour = {
        yellow: 'shadow-pt-yellow',
        orange: 'shadow-pt-orange'
    }


    const panelClassName = `${props.blur ? 'blur' : ''}  bg-pt-offwhite rounded-[30px] pl-4 pr-8 pb-8 pt-4 border-6 border-pt-brown min-h-[30rem] shadow-3xl ${shadowColour[props.shadow]}`;
    const parentClassName = `${sizeClasses[props.width]}`;

    return (
        <div className={parentClassName}>
            <div className="flex w-3/4">
                <div onClick={() => handleTabClick('Monthly')} className="cursor-pointer border-b-0 ml-7 grid bg-pt-yellow rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3">
                    <h1 className="text-pt-offwhite self-center m-auto">Monthly</h1>
                </div>
                <div onClick={() => handleTabClick('Weekly')} className="cursor-pointer border-b-0 grid bg-pt-orange rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3">
                    <h1 className="text-pt-offwhite self-center m-auto">Weekly</h1>
                </div>
                <div onClick={() => handleTabClick('Lifetime')} className="cursor-pointer border-b-0 mr-7 grid bg-pt-brown rounded-t-[30px] border-4 border-pt-brown min-h-[3rem] w-1/3">
                    <h1 className="text-pt-offwhite self-center m-auto">Lifetime</h1>
                </div>
            </div>
            <div  className={panelClassName}>
                {props.children}
            </div>
        </div>
    )
}
export {LeaderboardPanel}