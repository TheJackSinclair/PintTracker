import './globals.css'
import { Inter } from 'next/font/google'
import {NavBar} from "@/app/Components/Navbar";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Pint Tracker',
  description: 'All in One Pint Tracking App',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><NavBar/>
      {children}
      </body>
    </html>
  )
}
