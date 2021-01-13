const axios = require('axios')
const fs = require('fs')
// var m3u8Parser = require('m3u8-parser');
if (require.main === module) {
    // axios.get('http://localhost:8000/live/mystream2/index0.ts', {
    // })
    //     .then(function (response) {
    //         console.log(response.data)
    //         // console.log(getEdgeUrl(response.data))
    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     })
    axios({
        method: "get",
        url: "http://localhost:8000/live/mystream2/index0.ts",
        responseType: "stream"
    }).then(function (response) {
        response.data.pipe(fs.createWriteStream("./mystream2.ts"));
    }).catch( e => console.log(e));
}

// function getEdgeUrl (raw) {
//     const parser = new m3u8Parser.Parser()
//     parser.push(raw)
//     parser.end()
//     // return the uri of the last .ts file
//     return parser.manifest.segments.slice(-1).pop().uri
//   }