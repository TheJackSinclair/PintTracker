interface PanelProps {
    children: React.ReactNode;
    width: 'small' | 'medium' | 'large' | 'extralarge';
    shadow: 'yellow' | 'orange'
    centered?: boolean
}

const Panel = (props: PanelProps) => {

    const sizeClasses = {
        small: 'lg:w-1/4',
        medium: 'lg:w-2/5',
        large: 'lg:w-3/4',
        extralarge: 'lg:1/2'
    };

    const shadowColour = {
        yellow: 'shadow-pt-yellow',
        orange: 'shadow-pt-orange'
    }

    const panelClassName = `grid ${props.centered ? 'm-auto' : ''} bg-pt-offwhite rounded-[30px] p-8 border-6 border-pt-brown min-h-[30rem] ${sizeClasses[props.width]} shadow-3xl ${shadowColour[props.shadow]}`;

    return (
            <div className={panelClassName}>
                {props.children}
            </div>
    )
}
export {Panel}