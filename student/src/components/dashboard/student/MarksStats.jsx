import {useEffect, useState} from 'react'

const SIZE = 84
const STROKE = 9
const R = (SIZE - STROKE) / 2
const C = 2 * Math.PI * R
const GAP = 3 // px of empty space between the passed and failed arcs

/** One arc of the ring, drawn as a dash on a full circle. */
function Arc({length, offset, className, ready}) {
    return (
        <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            strokeWidth={STROKE}
            strokeLinecap="round"
            className={`${className} transition-all duration-1000 ease-out motion-reduce:transition-none`}
            strokeDasharray={`${ready ? length : 0} ${C}`}
            strokeDashoffset={-offset}
            transform={`rotate(-90 ${SIZE / 2} ${SIZE / 2})`}
        />
    )
}

/**
 * Compact marks summary: average in the middle of a passed/failed ring.
 */
export default function MarksStats({totalExams = 0, passed = 0, failed = 0, averagePercentage = 0, loading = false}) {
    const [ready, setReady] = useState(false)
    useEffect(() => {
        const id = requestAnimationFrame(() => setReady(true))
        return () => cancelAnimationFrame(id)
    }, [])

    const total = passed + failed
    const hasData = total > 0
    const avg = Number(averagePercentage) || 0

    // Leave a gap only when both arcs exist; a single arc fills the circle.
    const both = passed > 0 && failed > 0
    const usable = C - (both ? GAP * 2 : 0)
    const passedLen = hasData ? Math.max((passed / total) * usable, 0.01) : 0
    const failedLen = hasData ? Math.max((failed / total) * usable, 0.01) : 0

    const avgColor =
        avg >= 75 ? 'text-emerald-600 dark:text-emerald-400' :
        avg >= 50 ? 'text-amber-600 dark:text-amber-400' :
                    'text-rose-600 dark:text-rose-400'

    return (
        <div className="card mb-4 flex items-center gap-4 p-3">
            {/* Ring */}
            <div className="relative flex-shrink-0" style={{width: SIZE, height: SIZE}}>
                <svg width={SIZE} height={SIZE} role="img"
                     aria-label={hasData ? `Average ${avg}%, ${passed} passed, ${failed} failed` : 'No marks yet'}>
                    <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" strokeWidth={STROKE}
                            className="stroke-muted"/>
                    {hasData && (
                        <>
                            <Arc ready={ready} length={passedLen} offset={both ? GAP / 2 : 0}
                                 className="stroke-emerald-500"/>
                            <Arc ready={ready} length={failedLen}
                                 offset={passedLen + (both ? GAP * 1.5 : 0)}
                                 className="stroke-rose-500"/>
                        </>
                    )}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    {hasData ? (
                        <>
                            <span className={`cga-num text-[15px] font-bold leading-none tabular-nums ${avgColor}`}>
                                {avg}%
                            </span>
                            <span className="mt-0.5 text-[10px] text-muted-foreground">average</span>
                        </>
                    ) : (
                        <span className="px-3 text-center text-[10px] text-muted-foreground">
                            {loading ? '…' : 'No results'}
                        </span>
                    )}
                </div>
            </div>

            {/* Legend: one row per result, stacked */}
            <ul className="flex min-w-[120px] flex-col gap-1.5 text-sm">
                <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-500"/>
                    <span className="text-muted-foreground">Passed</span>
                    <span className="cga-num ml-auto font-bold tabular-nums text-emerald-600 dark:text-emerald-400">{passed}</span>
                </li>
                <li className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-rose-500"/>
                    <span className="text-muted-foreground">Failed</span>
                    <span className="cga-num ml-auto font-bold tabular-nums text-rose-600 dark:text-rose-400">{failed}</span>
                </li>
            </ul>
        </div>
    )
}
