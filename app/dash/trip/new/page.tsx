import React from 'react'
import { FaPlaneUp } from 'react-icons/fa6'

const page = () => {
  return (
    <div className='w-full justify-center'>
      <h2 className="text-2xl flex items-center gap-1 font-semibold tracking-tight text-neutral-900">
        <FaPlaneUp className="text-xl" /> Create New Trip
      </h2>
      <p className="mt-1 text-sm text-neutral-500">
        Create a new trip and start planning your next adventure.
      </p>
      <div>
        <form className="mt-4 flex flex-col max-w-xl gap-4">
          <div className="flex flex-col gap-1">
            <label htmlFor="tripName" className="text-sm font-medium text-neutral-700">
              Trip Name
            </label>
            <input
              type="text"
              id="tripName"
              name="tripName"
              placeholder="Enter trip name"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="tripDescription" className="text-sm font-medium text-neutral-700">
              Trip Description
            </label>
            <textarea
              id="tripDescription"
              name="tripDescription"
              placeholder="Enter trip description"
              className="rounded-md border border-neutral-300 px-3 py-2 text-sm text-neutral-900 focus:border-neutral-500 focus:ring focus:ring-neutral-200 focus:ring-opacity-50"
            />
          </div>
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition duration-300 ease-out hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Create Trip
          </button>
        </form>
      </div>
    </div>
  
  )
}

export default page