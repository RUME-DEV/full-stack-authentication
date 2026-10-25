import styles from './Pages.module.css'
import { Link, useLoaderData } from 'react-router-dom'

function ViewApplication() {
    const jobApplication = useLoaderData()

    const {
        _id,
        company,
        position,
        status,
        appliedDate,
        jobUrl,
        notes
    } = jobApplication

    const statusClass = {
        Applied: styles.statusApplied,
        Interview: styles.statusInterview,
        Rejected: styles.statusRejected,
        Withdrawn: styles.statusWithdrawn
    }

    return (
        <div className={styles.viewApplication}>

            <Link
                to="/applications"
                className={styles.backToApplications}
            >
                ← Back to Applications
            </Link>

            <section className={styles.applicationDetailsCard}>

                <header className={styles.detailsHeader}>
                    <div>
                        <h1>{company}</h1>
                        <p>{position}</p>
                    </div>

                    <span className={`${styles.detailsStatus} ${statusClass[status] || ''}`}>
                        {status}
                    </span>
                </header>

                <div className={styles.detailsSection}>
                    <h2>Application Details</h2>

                    <div className={styles.detailsRow}>
                        <span>Company</span>
                        <p>{company}</p>
                    </div>

                    <div className={styles.detailsRow}>
                        <span>Position</span>
                        <p>{position}</p>
                    </div>

                    <div className={styles.detailsRow}>
                        <span>Date Applied</span>
                        <p>
                            {appliedDate
                                ? new Date(appliedDate).toLocaleDateString(
                                    'en-GB',
                                    {
                                        day: '2-digit',
                                        month: 'short',
                                        year: 'numeric'
                                    }
                                )
                                : 'Not specified'}
                        </p>
                    </div>

                    {jobUrl && (
                        <div className={styles.detailsRow}>
                            <span>Job Posting</span>
                            <a
                                href={jobUrl}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View Job Posting ↗
                            </a>
                        </div>
                    )}
                </div>

                {notes && (
                    <div className={styles.detailsNotes}>
                        <h2>Notes</h2>
                        <p>{notes}</p>
                    </div>
                )}

                <div className={styles.detailsActions}>
                    <Link to={`/applications/${_id}/edit`}>
                        Edit Application
                    </Link>
                </div>

            </section>
        </div>
    )
}

export default ViewApplication