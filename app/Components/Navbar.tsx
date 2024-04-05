import Image from "next/image";


const NavBar = () => {
    return (
        <nav className=" bg-[#FFD93D]">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-left mx-auto p-3">
                <a href="/homepage">
                    <Image src={'/navbar.svg'} alt={'Pintlogo'} height={175} width={175}/>
                </a>

            </div>
        </nav>)
}

export { NavBar }