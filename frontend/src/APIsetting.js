/////////// For Testing /////////

// const httpAPI = () => {
//     const isAPI = "http://localhost:8888";
//     return isAPI;
// }

// const dugAPI = () => {
//     const isDebug = "http://localhost:8888"
//     return isDebug;
// }

/////////// For production ////////////
const httpAPI = () => {
    const isAPI = "http://localhost:443/backend";
    return isAPI;
}

const dugAPI = () => {
    const isDebug = "http://localhost:443/backend"
    return isDebug;
}


export {httpAPI, dugAPI}