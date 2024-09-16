interface modalProps {
    children: React.ReactNode;
    width: 'small' | 'medium' | 'large' | 'extralarge'
    onClose: () => void;
}

const Modal = (props: modalProps) => {

    const sizeClasses = {
        small: 'lg:w-1/4',
        medium: 'lg:w-2/5',
        large: 'lg:w-3/4',
        extralarge: 'lg:1/2'
    };

    const modalClassName = `absolute grid bg-pt-offwhite rounded-[30px] p-8 border-6 border-pt-brown min-h-[20rem] ${sizeClasses[props.width]} max-h-[80%] overflow-auto`;

    const backdropStyle = `fixed inset-0 bg-pt-black bg-opacity-40 z-50 flex items-center justify-center p-4 backdrop-blur-sm `;

    return (
        <div className={backdropStyle}>
            <div className={modalClassName} onClick={(e) => e.stopPropagation()}>
                {props.children}
                <button 
                    onClick={props.onClose}
                    style={{
                        fontSize: '20px',
                        color: '#333',
                        width: '30px',
                        height: '30px',
                        position: 'absolute',
                        right: '20px',
                        top: '20px'
                    }}>
                    &times;
                </button>
            </div>
        </div>
    )
}
export { Modal, type modalProps };
