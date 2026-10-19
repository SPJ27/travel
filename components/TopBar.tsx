'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FaPlane } from 'react-icons/fa6'
import { FiSearch, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { authClient } from '@/lib/auth-client'
import { UserProps } from '@/types/user'

const TopBar = ({ user, initial }: { user: UserProps; initial: string }) => {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  useEffect(() => {
    if (!open) return

    const handleClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handleClick)
    document.addEventListener('keydown', handleKey)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('keydown', handleKey)
    }
  }, [open])

  const handleLogout = async () => {
    setOpen(false)
    await authClient.signOut({
      fetchOptions: { onSuccess: () => router.push('/') },
    })
  }

  const itemClass =
    'flex w-full items-center gap-2 px-3 py-2 text-sm text-neutral-700 transition-colors duration-100 hover:bg-neutral-100'

  return (
    <div>
      <header className="sticky top-0 z-50 w-full border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 items-center justify-between gap-4 px-4 sm:px-8 lg:px-20">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3 leading-tight">
              <FaPlane className="rounded-sm bg-neutral-800 p-2 text-4xl text-white" />
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-[#191919]">
                  Triply
                </h1>
                <p className="text-xs font-light text-neutral-500">
                  Manage your trips
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="order-3 w-full sm:w-auto sm:flex-1 sm:px-6 lg:max-w-3xl lg:px-10">
              <form onSubmit={(e) => e.preventDefault()} className="relative w-full">
                <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400" />
                <input
                  type="search"
                  placeholder="Search destinations or dates..."
                  aria-label="Search trips by destination or date"
                  className="h-11 w-2xl rounded-md border border-neutral-200 bg-neutral-50 pl-11 pr-11 text-sm text-neutral-800 transition placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none"
                />
              </form>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-medium text-[#191919]">{user.name} <span className='text-white gradient bg-blue-600  font-bold text-xs px-1.5 rounded-2xl py-0.5 ml-1'>PRO</span></p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>

            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setOpen((prev) => !prev)}
                aria-haspopup="menu"
                aria-expanded={open}
                aria-label="Open user menu"
                className="cursor-pointer rounded-full focus:outline-none"
              >
                {user.image ? (
                  <Image
                    alt={user.name ? `${user.name}'s profile picture` : 'Profile picture'}
                    src={user.image}
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full object-cover shadow-sm outline-2 outline-offset-1 outline-blue-500 ring-2 ring-white transition-[outline-color] duration-150 hover:outline-blue-600"
                  />
                ) : (
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 ring-2 ring-white transition-colors duration-150 hover:bg-neutral-200">
                    {initial}
                  </div>
                )}
              </button>

              <div
                role="menu"
                aria-hidden={!open}
                className={`absolute right-0 mt-2 w-56 origin-top-right overflow-hidden rounded-md border border-neutral-200 bg-white py-1 shadow-lg will-change-[opacity,transform] transition-[opacity,scale,visibility] ease-out motion-reduce:transition-none ${
                  open
                    ? 'visible scale-100 opacity-100 duration-[120ms]'
                    : 'invisible scale-95 opacity-0 duration-[90ms]'
                }`}
              >
                <div className="border-b border-neutral-100 px-3 py-2 sm:hidden">
                  <p className="text-sm font-medium text-[#191919]">{user.name} </p>
                  <p className="truncate text-xs text-neutral-500">{user.email}</p>
                </div>

                <Link
                  href="/profile"
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={itemClass}
                >
                  <FiUser /> Profile
                </Link>
                <Link
                  href="/settings"
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  onClick={() => setOpen(false)}
                  className={itemClass}
                >
                  <FiSettings /> Settings
                </Link>

                <div className="my-1 border-t border-neutral-100" />

                <button
                  type="button"
                  role="menuitem"
                  tabIndex={open ? 0 : -1}
                  onClick={handleLogout}
                  className={`${itemClass} text-red-600 hover:bg-red-50`}
                >
                  <FiLogOut /> Log out
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  )
}

export default TopBar