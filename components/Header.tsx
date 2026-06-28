"use client"
import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { navItems } from '@/data/data'
import { RiMenuLine, RiCloseLine } from '@remixicon/react'
import { usePathname } from 'next/navigation'

export default function Header() {
  const [isOpen, setIsOpen] = React.useState(false);
  const handleClick = () => {
    setIsOpen(!isOpen);
  }
  const pathname = usePathname();
  return (
    <header className='w-full py-4 lg:py-0 fixed top-0 left-0 z-40 border-y border-primary-100 bg-white'>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/">
          <Image src="/images/logo.png" alt="Logo image" width={167} height={43} />
        </Link>
{/* Mobile Menu */}
        <nav className={`lg:hidden absolute top-full left-0 w-full bg-white/60 backdrop-blur-2xl border-y border-gray-200 flex items-center justify-center -z-30 -translate-y-[170%] transition-transform ${isOpen ? "translate-y-0 z-40" : ""}`}>
          <ul className='py-6 text-center'> 
            {navItems.map(item => (
              <li key={item.id}>
                <Link href={item.href } className={`uppercase p-1.5 inline-block hover:text-primary-600 transition-colors font-medium ${pathname == item.href ? "text-primary-600" : ""}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>  

{/* Desktop Menu */}   
   <nav className="hidden lg:block">
          <ul className='flex items-center gap-12'> 
            {navItems.map(item => (
              <li key={item.id}>
                <Link href={item.href } className={`font-semibold border-b-[3px] border-white hover:border-primary-600 hover:text-primary-600 transition-colors block py-4 ${pathname == item.href ? "border-primary-600! text-primary-600" : ""}`}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Menu Btn */}
        <button className="lg:hidden border border-gray-300 size-11 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors focus:bg-gray-100" onClick={handleClick}>
          {isOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>
      </div>
    </header>
  )
}
