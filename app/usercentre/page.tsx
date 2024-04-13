import {Panel} from "@/app/Components/Panel";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Panel width={'small'} shadow={'yellow'}>
          <h1 className="font-bold text-pt-brown text-6xl mb-6 drop-shadow-[2px_2px_var(--tw-shadow-color)] text-center">Username</h1>

          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
            <Image src={'/pencil.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1 '}/>
            <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 hover:bg-pt-yellow hover:border-pt-red'}>Edit Profile</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/friend.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 hover:bg-pt-yellow hover:border-pt-red'}>Friends</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/userPint.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 hover:bg-pt-yellow hover:border-pt-red'}>My Pints</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/admin.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 hover:bg-pt-yellow hover:border-pt-red'}>Admin Panel</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/logout.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 hover:bg-pt-yellow hover:border-pt-red'}>Logout</button>
          </div>
          <div className={'grid grid-cols-8 grid-rows-1 gap-3 '}>
              <Image src={'/delete.svg'} alt={'Pencil Icon'} width={35} height={35} className={'justify-self-end col-span-1'}/>
              <button className={'rounded-2xl border-2 max-h-10 min-w-[10rem] col-span-7 hover:bg-pt-yellow hover:border-pt-red'}>Delete Account</button>
          </div>

      </Panel>
    </main>
  )
}
