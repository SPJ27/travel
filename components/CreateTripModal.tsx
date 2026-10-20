"use client";
import { useEffect, useRef, useState } from "react";
import { authClient } from "@/lib/auth-client";

const slugify = (s: string) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const inputClass =
  "h-11 w-full rounded-sm border border-neutral-200 bg-neutral-50 mt-0.5 px-3 text-sm text-neutral-800 transition placeholder:text-neutral-400 focus:border-neutral-300 focus:outline-none";

export default function CreateTripModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  const reset = () => {
    setName("");
    setDate("");
    setImage("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError("Trip name is required");

    setLoading(true);
    setError(null);

    const { error } = await authClient.organization.create({
      name: name.trim(),
      slug: `${slugify(name)}-${Math.random().toString(36).slice(2, 7)}`,
      logo: image.trim() || undefined,
      metadata: { date },
    });

    setLoading(false);

    if (error) return setError(error.message ?? "Could not create trip");

    reset();
    onClose();
  };

  return (
    <dialog
      ref={dialogRef}
      onClose={onClose} 
      onClick={(e) => {
        if (e.target === dialogRef.current) onClose();
      }}
      className="m-auto w-full max-w-md rounded-2xl p-0 shadow-3xl transition-[opacity,scale] duration-300 backdrop:bg-black/50 backdrop:backdrop-blur-xs starting:open:scale-50 starting:open:opacity-0 motion-reduce:transition-none"
    >
      <form onSubmit={handleSubmit} className="space-y-5 p-6">
        {/* <div>
          <h2 className="text-xl font-semibold tracking-tighter text-[#191919]">
            Create a new trip
          </h2>
          <p className="mt-1 text-xs text-neutral-400">
            Give your trip a name and a date. You can invite people later.
          </p>
        </div> */}

        <div className="space-y-4">
          <div className="space-y-1.5">
            <label htmlFor="trip-name" className="text-sm font-medium text-neutral-800">
              Trip name
            </label>
            <input
              id="trip-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Goa with friends"
              className={inputClass}
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="trip-date" className="text-sm font-medium text-neutral-800">
              Date
            </label>
            <input
              id="trip-date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="eg. February, 2027"
              className={inputClass}
              autoFocus
            />
          </div>

          <div className="space-y-1.5">
            <label htmlFor="trip-image" className="text-sm font-medium text-neutral-800">
              Cover image URL <span className="font-normal text-neutral-400">(optional)</span>
            </label>
            <input
              id="trip-image"
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://..."
              className={inputClass}
            />
          </div>
        </div>

        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}

        <div className="flex justify-end gap-2 pt-1">
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-4 py-2 text-sm font-medium text-neutral-700 transition-colors hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create trip"}
          </button>
        </div>
      </form>
    </dialog>
  );
}