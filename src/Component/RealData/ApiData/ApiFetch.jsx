export async function getAllData() {

    let data = await fetch("http://localhost:3000/all")

    let res = await data.json();
    return res

}
