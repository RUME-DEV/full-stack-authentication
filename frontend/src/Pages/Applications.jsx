import { useState } from 'react'
import { Link, useLoaderData } from 'react-router-dom'
import Application from '../Components/Application'
import styles from './Pages.module.css'

function Applications() {
    const jobApplications = useLoaderData()

    const [search, setSearch] = useState('')
    const [statusFilter, setStatusFilter] = useState('All')

    const filteredApplications = jobApplications.filter(jobApplication => {

        const matchesSearch =
            jobApplication.company.toLowerCase().includes(search.toLowerCase()) ||
            jobApplication.position.toLowerCase().includes(search.toLowerCase())

        const matchesStatus =
            statusFilter === 'All' || jobApplication.status === statusFilter

        return matchesSearch && matchesStatus
    })

    return (
        <div className={styles.applications}>

            <div className={styles.applicationsHeader}>
                <div>
                    <h1>My Applications</h1>
                    <p>Keep track of your job search.</p>
                </div>

                <Link to="/dashboard" className={styles.addApplicationLink}>
                    + Add Application
                </Link>
            </div>

            <div className={styles.applicationControls}>
                <input
                    type="search"
                    placeholder="Search company or position..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    aria-label="Search applications"
                />

                <select
                    value={statusFilter}
                    onChange={e => setStatusFilter(e.target.value)}
                    aria-label="Filter applications by status"
                >
                    <option value="All">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Withdrawn">Withdrawn</option>
                </select>
            </div>

            {jobApplications.length === 0 ? (
                <div className={styles.emptyApplications}>
                    <h2>No Applications Yet</h2>
                    <p>Your job search starts here.</p>
                    <Link to="/dashboard">Add Your First Application</Link>
                </div>
            ) : filteredApplications.length === 0 ? (
                <div className={styles.emptyApplications}>
                    <h2>No Matching Applications</h2>
                    <p>Try another search term or status.</p>
                </div>
            ) : (
                <>
                    <p className={styles.applicationCount}>
                        Showing {filteredApplications.length}{' '}
                        {filteredApplications.length === 1
                            ? 'application'
                            : 'applications'}
                    </p>

                    <div className={styles.applicationGrid}>
                        {filteredApplications.map(jobApplication => (
                            <Application
                                key={jobApplication._id}
                                id={jobApplication._id}
                                company={jobApplication.company}
                                position={jobApplication.position}
                                status={jobApplication.status}
                                appliedDate={jobApplication.appliedDate}
                            />
                        ))}
                    </div>
                </>
            )}

        </div>
    )
}

export default Applications