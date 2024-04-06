import Image from "next/image";


const NavBar = () => {
    return (
        <nav className="bg-pt-yellow drop-shadow-md">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-left mx-auto p-3">
                <a href="/homepage">
                    <Image src={'/lightLogo.svg'} alt={'Pintlogo'} height={175} width={175} className={'drop-shadow-lg'}/>
                </a>

            </div>
        </nav>)
}

export { NavBar }