import axios from "axios";

export function Post (url, payload, config) {
     axios.post (url,payload,config) 
    .then((response) => {
       return response;
    })
    .catch((e) => {
        return e;
    });
   
}
