interface PanelProps {
    children: React.ReactNode;
}

const Panel = (props: PanelProps) => {
    return (
            <div className="grid bg-pt-offwhite rounded-[50px] lg:w-1/4 p-10 border-4 border-pt-brown min-h-[30rem]">
                {props.children}
            </div>
    )
}
export {Panel}