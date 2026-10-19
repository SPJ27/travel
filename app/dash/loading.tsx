import { FaPlane } from 'react-icons/fa6'

export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen w-full items-center justify-center bg-white"
    >
      <div className="flex flex-col items-center gap-5">
        <div className="relative h-16 w-16">
          {/* Track */}
          <div className="absolute inset-0 rounded-full border-[3px] border-neutral-200" />

          {/* Spinning arc */}
          <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-neutral-900 [animation-duration:0.8s]" />

          {/* Center icon */}
          <FaPlane className="absolute inset-0 m-auto animate-pulse text-xl text-neutral-800" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium text-neutral-800">Loading</p>
          
        </div>

      </div>
    </div>
  )
}