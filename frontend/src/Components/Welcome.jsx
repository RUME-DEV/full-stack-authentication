import styles from "./Component.module.css"

function Welcome({username, name, email, id, copyId}) {
    return (
        <div className={styles.welcome}>
            <h1>Welcome {username}</h1>
            <p onClick={copyId}>{id ? `Id: ${id}` : null}</p>
            <p>{name ? `Name: ${name}` : null}</p>
            <p>email: {email}</p>
        </div>
    )
}


export default Welcome