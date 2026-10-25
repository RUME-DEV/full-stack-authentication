import styles from './Component.module.css'
import { Link, useRevalidator } from 'react-router-dom'
import JOBAPI from '../API'

function Application({ id, company, position, status, appliedDate }) {
    const revalidator = useRevalidator()

    const statusClass = {
        Applied: styles.statusApplied,
        Interview: styles.statusInterview,
        Rejected: styles.statusRejected,
        Withdrawn: styles.statusWithdrawn
    }

    const handleDelete = async () => {
        const confirmed = window.confirm(
            `Are you sure you want to delete your application to ${company.toUpperCase()}?`
        )

        if (!confirmed) return

        try {
            await JOBAPI.delete(`/application/${id}`)
            revalidator.revalidate()
        } catch (error) {
            alert(
                error.response?.data?.message ||
                'Could not delete the application. Please try again.'
            )
        }
    }

    return (
        <article className={styles.application}>

            <div className={styles.applicationTop}>
                <div>
                    <h2>{company}</h2>
                    <p className={styles.applicationPosition}>
                        {position}
                    </p>
                </div>

                <span className={`${styles.applicationStatus} ${statusClass[status] || ''}`}>
                    {status}
                </span>
            </div>

            <div className={styles.applicationFooter}>
                <p className={styles.applicationDate}>
                    Applied: {appliedDate?.slice(0, 10) || 'Not specified'}
                </p>

                <div className={styles.applicationButtons}>
                    <Link to={`/applications/${id}`}>
                        View
                    </Link>

                    <Link to={`/applications/${id}/edit`}>
                        Edit
                    </Link>

                    <button type="button" onClick={handleDelete}>
                        Delete
                    </button>
                </div>
            </div>

        </article>
    )
}

export default Application