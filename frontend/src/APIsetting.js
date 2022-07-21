/////////// ++++++++++++++ ////////////
///////////  For Testing  ////////////
/////////// ++++++++++++++ ////////////

const httpAPI = () => {
    const isAPI = "http://localhost:8888/backend";
    return isAPI;
}

const httpAPIWordCloud = () => {
    const isAPI = "http://127.0.0.1:8773/faskapi"
    return isAPI;
}

const dugAPI = () => {
    const isDebug = "http://localhost:8888"
    return isDebug;
}

/////////// ++++++++++++++ ////////////
/////////// For production ////////////
////////// +++++++++++++++ ///////////

// const httpAPI = () => {
//     const isAPI = "http://localhost:443/backend";
//     return isAPI;
// }

// const httpAPIWordCloud = () => {
//     const isAPI = "http://127.0.0.1:443/faskapi"
// }

// const dugAPI = () => {
//     const isDebug = "http://localhost:443/backend"
//     return isDebug;
// }

/////////// ++++++++++++++ ////////////
///////////////////////////////////////
/////////// ++++++++++++++ ////////////

export {httpAPI, dugAPI, httpAPIWordCloud}