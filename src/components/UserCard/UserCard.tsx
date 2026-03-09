import type { User } from "../../types/user";
import styles from "./UserCard.module.scss";

interface UserCardProps {
    user: User;
}

const getRoleModifier = (role: string): string => {
    switch (role.toLowerCase()) {
        case 'admin':
            return styles.roleAdmin;
        case 'moderator':
            return styles.roleModerator;
        default:
            return '';
    }
};

const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
};

const getAgeInfo = (birthDate: string): { age: number; declension: string } => {
    const today = new Date();
    const birth = new Date(birthDate);

    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }

    const lastDigit = age % 10;
    const lastTwoDigits = age % 100;

    let declension: string;
    if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
        declension = 'лет';
    } else if (lastDigit === 1) {
        declension = 'год';
    } else if (lastDigit >= 2 && lastDigit <= 4) {
        declension = 'года';
    } else {
        declension = 'лет';
    }

    return { age, declension };
};

export const UserCard = ({ user }: UserCardProps) => {
    const { firstName, lastName, role, email, phone, image, company, address, birthDate } = user;
    const roleClass = getRoleModifier(role);
    const { age, declension } = getAgeInfo(birthDate);
    const formattedBirthDate = formatDate(birthDate);

    return (
        <article className={styles.card} aria-label={`Профиль пользователя ${firstName} ${lastName}`}>
            <header className={styles.header}>
                <div className={styles.avatarWrapper}>
                    <img
                        src={image}
                        alt=""
                        className={styles.avatar}
                        loading="lazy"
                    />
                </div>

                <div className={styles.identity}>
                    <h3 className={styles.name}>
                        {firstName} {lastName}
                        <span className={`${styles.role} ${roleClass}`} aria-label={`Роль: ${role}`}>
                            {role}
                        </span>
                    </h3>

                    {company?.title && (
                        <p className={styles.company}>
                            {company.title}
                        </p>
                    )}

                    <a
                        href={`mailto:${email}`}
                        className={styles.email}
                        aria-label={`Написать письмо на адрес ${email}`}
                    >
                        {email}
                    </a>
                </div>
            </header>

            <section className={styles.details}>
                {address?.city && address?.country && (
                    <div className={styles.detailItem}>
                        <span className={styles.detailIcon}>📍</span>
                        <span>{address.city}, {address.country}</span>
                    </div>
                )}

                <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>🎂</span>
                    <span>{age} {declension} ({formattedBirthDate})</span>
                </div>

                <div className={styles.detailItem}>
                    <span className={styles.detailIcon}>📞</span>
                    <a href={`tel:${phone}`} aria-label={`Позвонить по номеру ${phone}`}>
                        {phone}
                    </a>
                </div>
            </section>

            {user.university && (
                <footer className={styles.footer}>
                    <span className={styles.university}>🎓 {user.university}</span>
                </footer>
            )}
        </article>
    )
}