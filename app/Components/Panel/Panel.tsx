interface PanelProps {
    children: React.ReactNode;
    width: 'small' | 'medium' | 'large' | 'extralarge';
    shadow?: 'yellow' | 'orange';
    padding?: string
    blur?: boolean;
    centered?: boolean;
}

const Panel = (props: PanelProps) => {

    const sizeClasses = {
        small: 'lg:w-1/4',
        medium: 'lg:w-2/5',
        large: 'lg:w-3/4',
        extralarge: 'lg:1/2'
    };

    const shadowColour = {
        yellow: 'lg:shadow-3xl lg:shadow-pt-yellow',
        orange: 'lg:shadow-3xl lg:shadow-pt-orange'
    }


    const panelClassName = `grid ${props.blur ? 'blur' : ''} ${props.centered ? 'm-auto' : ''} bg-pt-offwhite rounded-[30px] p-${props.padding ?? '8'} border-4 border-pt-brown min-h-[30rem] ${sizeClasses[props.width]} ${props.shadow ? shadowColour[props.shadow] : ''}`;

    return (
        <div className={panelClassName}>
            {props.children}
        </div>
    )
}
export {Panel}