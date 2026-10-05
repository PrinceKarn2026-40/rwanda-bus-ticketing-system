import type { Seat } from '@/types'

interface SeatMapProps {
  seats: Seat[]
  selectedSeat: Seat | null
  onSelect: (seat: Seat | null) => void
}

// Split seats into rows of 4 (2 left | aisle | 2 right)
function toRows(seats: Seat[]): (Seat | null)[][] {
  const rows: (Seat | null)[][] = []
  for (let i = 0; i < seats.length; i += 4) {
    const chunk = seats.slice(i, i + 4)
    // pad last row if needed
    while (chunk.length < 4) chunk.push(null)
    rows.push(chunk)
  }
  return rows
}

function SeatButton({ seat, isSelected, onSelect }: {
  seat: Seat
  isSelected: boolean
  onSelect: (s: Seat | null) => void
}) {
  const isTaken = !seat.isAvailable
  return (
    <button
      disabled={isTaken}
      onClick={() => onSelect(isSelected ? null : seat)}
      title={isTaken ? `Seat ${seat.seatNumber} — Taken` : `Seat ${seat.seatNumber} — Available`}
      className={[
        'relative flex h-10 w-10 flex-col items-center justify-center rounded-t-xl border-2 text-[11px] font-bold transition-all focus:outline-none focus:ring-2 focus:ring-primary-500',
        isTaken
          ? 'cursor-not-allowed border-gray-300 bg-gray-200 text-gray-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-500'
          : isSelected
          ? 'border-primary-700 bg-primary-600 text-white shadow-lg scale-105'
          : 'border-green-400 bg-green-100 text-green-800 hover:border-primary-500 hover:bg-primary-100 hover:scale-105 dark:border-green-700 dark:bg-green-900/30 dark:text-green-300',
      ].join(' ')}
    >
      {/* Seat back */}
      <span className={[
        'absolute -top-1 left-0 right-0 h-1.5 rounded-t-md',
        isTaken ? 'bg-gray-300 dark:bg-gray-600' : isSelected ? 'bg-primary-700' : 'bg-green-400 dark:bg-green-700',
      ].join(' ')} />
      {seat.seatNumber}
    </button>
  )
}

export default function SeatMap({ seats, selectedSeat, onSelect }: SeatMapProps) {
  const rows = toRows(seats)
  const available = seats.filter((s) => s.isAvailable).length
  const taken = seats.length - available

  return (
    <div className="select-none">
      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-t-lg border-2 border-green-400 bg-green-100 dark:border-green-700 dark:bg-green-900/30" />
          Available ({available})
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-t-lg border-2 border-primary-700 bg-primary-600" />
          Selected
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-4 w-4 rounded-t-lg border-2 border-gray-300 bg-gray-200 dark:border-gray-600 dark:bg-gray-700" />
          Taken ({taken})
        </span>
      </div>

      {/* Bus shell */}
      <div className="mx-auto w-fit rounded-2xl border-4 border-gray-300 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-800/60">

        {/* Driver cabin */}
        <div className="mb-4 flex items-center justify-between rounded-xl border-2 border-dashed border-gray-300 bg-white px-4 py-2 dark:border-gray-600 dark:bg-gray-700">
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">🚌 DRIVER</span>
          <div className="h-6 w-10 rounded-full border-2 border-gray-300 bg-gray-100 dark:border-gray-500 dark:bg-gray-600" />
          <span className="text-xs font-semibold text-gray-400 dark:text-gray-500">DOOR →</span>
        </div>

        {/* Column headers */}
        <div className="mb-2 grid grid-cols-[2.5rem_2.5rem_1.5rem_2.5rem_2.5rem] gap-1.5 px-1">
          <span className="text-center text-[10px] font-semibold text-gray-400">A</span>
          <span className="text-center text-[10px] font-semibold text-gray-400">B</span>
          <span />
          <span className="text-center text-[10px] font-semibold text-gray-400">C</span>
          <span className="text-center text-[10px] font-semibold text-gray-400">D</span>
        </div>

        {/* Seat rows */}
        <div className="space-y-2">
          {rows.map((row, rowIdx) => (
            <div key={rowIdx} className="grid grid-cols-[2.5rem_2.5rem_1.5rem_2.5rem_2.5rem] items-center gap-1.5">
              {/* Left pair */}
              {row.slice(0, 2).map((seat, i) =>
                seat ? (
                  <SeatButton key={seat.id} seat={seat} isSelected={selectedSeat?.id === seat.id} onSelect={onSelect} />
                ) : (
                  <div key={i} className="h-10 w-10" />
                )
              )}
              {/* Aisle */}
              <div className="flex items-center justify-center">
                <span className="text-[9px] font-medium text-gray-300 dark:text-gray-600">{rowIdx + 1}</span>
              </div>
              {/* Right pair */}
              {row.slice(2, 4).map((seat, i) =>
                seat ? (
                  <SeatButton key={seat.id} seat={seat} isSelected={selectedSeat?.id === seat.id} onSelect={onSelect} />
                ) : (
                  <div key={i} className="h-10 w-10" />
                )
              )}
            </div>
          ))}
        </div>

        {/* Rear */}
        <div className="mt-4 rounded-lg border-2 border-dashed border-gray-300 py-1.5 text-center text-[10px] font-semibold text-gray-400 dark:border-gray-600 dark:text-gray-500">
          REAR
        </div>
      </div>

      {selectedSeat && (
        <p className="mt-3 text-center text-sm font-medium text-primary-600 dark:text-primary-400">
          Seat <strong>{selectedSeat.seatNumber}</strong> selected
        </p>
      )}
    </div>
  )
}
