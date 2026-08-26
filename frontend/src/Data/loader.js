export async function userLoader({ params }) {
    const res = await fetch(`https://jsonplaceholder.typicode.com/users/${params.userId}`)

    if (!res.ok) throw new Response("User Request Failed", {status: res.status})

    return res.json()
}

// let count = 0

// export function displayCount() {
//     return {count}
// }

// export async function updateCount() {
//     await new Promise(resolve => setTimeout(resolve, 2000))
//     count++
//     return null
// }