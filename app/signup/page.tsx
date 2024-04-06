import {Panel} from "@/app/Components/Panel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <Panel width={'small'} shadow={'yellow'}>
            <p className={'text-pt-brown text-4xl font-bold'}>Sign In</p>
            <div>
                <input type="text" id="username"
                       className="border text-gray-900 text-sm rounded-lg w-full p-4"
                       placeholder="Username" required/>
            </div>
            <div>
                <input type="text" id="username"
                       className="border text-gray-900 text-sm rounded-lg w-full p-4"
                       placeholder="Password" required/>
            </div>
            <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 min-w-full">
                Sign In
            </button>
            <a href={'/signup'}>
                <button className="bg-pt-red text-pt-offwhite font-bold rounded-2xl max-h-[4rem] p-4 min-w-full">
                    Sign up now
                </button>
            </a>
        </Panel>
    </main>
  )
}
