import type { ChangeEvent } from "react"
import styles from "./SearchInput.module.scss"

interface SearchInputProps {
    value: string
    onChange: (value: string) => void
}

export const SearchInput = ({ value, onChange }: SearchInputProps) => {

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value)
    }

    return (
        <div className={styles.wrapper}>
            <input
                type="text"
                value={value}
                onChange={handleChange}
                placeholder="Search users..."
                className={styles.input}
            />
        </div>
    )
}