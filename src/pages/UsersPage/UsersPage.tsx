import { useEffect, useState } from 'react'
import { usersService } from '../../services/usersService'
import type { User } from '../../types/user'
import { UserCard } from '../../components/UserCard/UserCard'
import { SearchInput } from '../../components/shared/SearchInput/SearchInput'
import { Pagination } from '../../components/shared/Pagination/Pagination'
import { useDebounce } from '../../hooks/useDebounce'
import styles from "./UsersPage.module.scss"

const LIMIT = 9;

export const UsersPage = () => {
    const [users, setUsers] = useState<User[]>([])
    const [total, setTotal] = useState(0)

    const [page, setPage] = useState(1)
    const [search, setSearch] = useState("")

    const debouncedSearch = useDebounce(search)

    const loadUsers = async () => {
        try {
            if (debouncedSearch) {
                const result = await usersService.searchUsers(debouncedSearch)

                setUsers(result.users)
                setTotal(result.total)
                return
            }

            const skip = (page - 1) * LIMIT

            const result = await usersService.fetchUsers(LIMIT, skip)

            setUsers(result.users)
            setTotal(result.total)
        } catch (error) {
            console.error("Failed to load users", error)
        }
    }

    useEffect(() => {
        loadUsers()
    }, [page, debouncedSearch])

    const handleSearch = (value: string) => {
        setSearch(value)
        setPage(1)
    }

    return (
        <main className={styles.page}>
            <div className="container">
                <h3 className={styles.title}>Users Catalog</h3>

                <section className={styles.toolbar}>
                    <SearchInput value={search} onChange={handleSearch} />
                </section>

                <section className={styles.grid}>
                    {users.map((user) => (
                        <UserCard key={user.id} user={user} />
                    ))}
                </section>

                {total > LIMIT && (
                    <Pagination
                        page={page}
                        total={total}
                        limit={LIMIT}
                        onChange={setPage}
                    />
                )}
            </div>
        </main>
    )
}