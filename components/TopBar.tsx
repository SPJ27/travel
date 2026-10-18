'use client'
import { FaPlane } from 'react-icons/fa6'
import { FiSearch } from 'react-icons/fi'
import Image from 'next/image'
import { UserProps } from '@/types/user'

const TopBar = ({user, initial}: {user: UserProps; initial: string}) => {
  return (
    <div>
        <header className="sticky top-0 z-50 w-full  border-b border-neutral-200/80 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16  items-center justify-between gap-4 px-4 sm:px-8 lg:px-20">
          <div className="flex items-center gap-3">

            <div className="leading-tight gap-3 items-center flex">
              <FaPlane className="text-4xl bg-neutral-800 text-white p-2 rounded-sm" />
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-[#191919]">
                  Triply
                </h1>
                <p className="text-xs font-light text-neutral-500">
                  Manage your trips
                </p>
              </div></div>
          </div>
    <div>
      
      
      <div className="order-3 w-full  sm:w-auto sm:flex-1 sm:px-6 lg:max-w-3xl lg:px-10">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="relative w-full"
            >
              <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-neutral-400" />

              <input
                type="search"
                placeholder="Search destinations or dates..."
                aria-label="Search trips by destination or date"
                className="h-11 w-2xl rounded-md border border-neutral-200 bg-neutral-50 pl-11 pr-11 text-sm text-neutral-800 focus:border-neutral-300 focus:outline-none transition placeholder:text-neutral-400 "
              />

            </form>
          </div>

    </div>
          <div className="flex items-center gap-3">
            <div className="hidden text-right leading-tight sm:block">
              <p className="text-sm font-medium text-[#191919]">
                {user.name}
              </p>
              <p className="text-xs text-neutral-500">{user.email}</p>
            </div>
            {user.image ? (
              <Image
                alt={user.name ? `${user.name}'s profile picture` : "Profile picture"}
                src={user.image}
                width={40}
                height={40}
                className="h-10 w-10  outline-solid outline-2.5 outline-blue-500 rounded-full object-cover ring-2 ring-white shadow-sm  outline-offset-1 transition hover:outline-blue-600"
              />
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100 text-sm font-semibold text-neutral-600 ring-2 ring-white">
                {initial}
              </div>
            )}
            {/* <LuLogOut /> */}
          </div>
        </div>
      </header>
    </div>
  )
}

export default TopBar