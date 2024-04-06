interface PanelProps {
    children: React.ReactNode;
    width: 'small' | 'medium' | 'large'
}

const Panel = (props: PanelProps) => {

    const sizeClasses = {
        small: 'lg:w-1/4',
        medium: 'lg:w-2/5',
        large: 'lg:w-3/4',
    };

    const panelClassName = `grid bg-pt-offwhite rounded-[50px] p-10 border-4 border-pt-brown min-h-[30rem] ${sizeClasses[props.width]}`;

    return (
            <div className={panelClassName}>
                {props.children}
            </div>
    )
}
export {Panel}