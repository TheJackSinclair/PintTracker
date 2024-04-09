import Image from "next/image";


const NavBar = () => {
    return (
        <nav className={"bg-pt-yellow shadow-lg"}>
            <div className="max-w-screen-xl flex flex-wrap items-center justify-left mx-auto p-3">
                <a href="/homepage">
                    <Image src={'/lightLogo.svg'} alt={'Pintlogo'} height={175} width={175} className={'drop-shadow-text'}/>
                </a>
                <a href="/usercentre">
                    <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>User Centre</p>
                </a>
                <a href="/mypints">
                    <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>MyPints</p>
                </a>
                <a href="/leaderboard">
                    <p className={'text-pt-beige p-4 font-semibold hover:underline decoration-2 drop-shadow-text'}>Leaderboard</p>
                </a>
            </div>
        </nav>)
}

export { NavBar }