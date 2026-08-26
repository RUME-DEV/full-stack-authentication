import styles from "./Component.module.css"

function Welcome({username, name, email, id}) {
    return (
        <div className={styles.welcome}>
            <h1>Welcome {username}</h1>
            <p>{id ? `Id: ${id}` : null}</p>
            <p>{name ? `Name: ${name}` : null}</p>
            <p>email: {email}</p>
        </div>
    )
}


export default Welcome