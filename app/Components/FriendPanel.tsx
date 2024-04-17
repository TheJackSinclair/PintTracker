interface PanelProps {
    children: React.ReactNode;
    width: 'small' | 'medium' | 'large' | 'extralarge';
    shadow: 'yellow' | 'orange'
    centered?: boolean
}

const FriendPanel = (props: PanelProps) => {

    const sizeClasses = {
        small: 'lg:w-1/4',
        medium: 'lg:w-2/5',
        large: 'lg:w-3/4',
        extralarge: 'lg:1/2'
    };

    const panelClassName = `grid ${props.centered ? 'm-auto' : ''} bg-pt-offwhite rounded-[30px] h-[60rem] p-8 border-6 border-pt-brown min-h-[30rem] ${sizeClasses[props.width]}`;

    return (
        <div className={panelClassName}>
            {props.children}
        </div>
    )
}
export {FriendPanel}