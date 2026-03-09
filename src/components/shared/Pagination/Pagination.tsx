import { useMemo } from "react"
import clsx from "clsx"
import styles from "./Pagination.module.scss"

interface PaginationProps {
    page: number
    total: number
    limit: number
    onChange: (page: number) => void
}

type PageItem = number | "dots"

export const Pagination = ({
    page,
    total,
    limit,
    onChange,
}: PaginationProps) => {
    const totalPages = Math.ceil(total / limit)

    const items = useMemo<PageItem[]>(() => {
        if (totalPages <= 7) {
            return Array.from({ length: totalPages }, (_, i) => i + 1)
        }

        // начало списка
        if (page <= 4) {
            return [1, 2, 3, 4, 5, "dots", totalPages]
        }

        // конец списка
        if (page >= totalPages - 3) {
            return [
                1,
                "dots",
                totalPages - 4,
                totalPages - 3,
                totalPages - 2,
                totalPages - 1,
                totalPages,
            ]
        }

        // середина
        return [
            1,
            "dots",
            page - 1,
            page,
            page + 1,
            "dots",
            totalPages,
        ]
    }, [page, totalPages])

    return (
        <div className={styles.pagination}>
            <button
                className={styles.navButton}
                disabled={page === 1}
                onClick={() => onChange(page - 1)}
            >
                Prev
            </button>

            {items.map((item, index) =>
                item === "dots" ? (
                    <span key={`dots-${index}`} className={styles.dots}>
                        …
                    </span>
                ) : (
                    <button
                        key={item}
                        className={clsx(styles.button, {
                            [styles.active]: item === page,
                        })}
                        onClick={() => onChange(item)}
                    >
                        {item}
                    </button>
                )
            )}

            <button
                className={styles.navButton}
                disabled={page === totalPages}
                onClick={() => onChange(page + 1)}
            >
                Next
            </button>
        </div>
    )
}