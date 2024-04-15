interface buttonProps {
    children: React.ReactNode;
    handleClick: () => void;
}

const Button: React.FC<buttonProps> = ({ children, handleClick }) => {

    const modalClassName = `bg-pt-red hover:bg-blue-700 font-bold py-2 px-12 md:py-3 md:px-24 rounded-lg text-xl md:text-2xl flex items-cente mt-10`;

    return (
            <button className={modalClassName} onClick={handleClick}>
                {children}
            </button>
    )
}
export {Button}