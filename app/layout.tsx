import './globals.css'
import {Inter} from 'next/font/google'
import {Sidebar} from "@/app/Components/Navbar";
import {AuthProvider} from "@/app/AuthProvider";

const inter = Inter({subsets: ['latin']})

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
        <AuthProvider>
            <html lang="en">
            <body className={inter.className}><Sidebar/>
            {children}
            </body>
            </html>
        </AuthProvider>
    )
}
