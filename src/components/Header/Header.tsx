import { ReactNode } from 'react'
import { Logo } from '@assets'

const Header = ({ children }: { children: ReactNode }) => {
	return (
		<header className="bg-blue-950 p-4 flex justify-between items-center shadow-lg">
			<a href="/" className="text-white text-lg font-bold">
				<Logo />
			</a>
			<nav className="flex flex-row gap-2">{children}</nav>
		</header>
	)
}

export default Header
