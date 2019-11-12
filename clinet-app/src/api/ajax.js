import axios from 'axios'

export default function ajax(url='',type,data={}) {
    if(type === 'GET'){
        //{username:ti,password:it}
        //username=ti&password=it
        let query = '';
        Object.keys(data).forEach(key => {
            query += key + '=' + data[key] + '&';
        })

        if(query !== ''){
            query = query.substring(0,query.length-1);
            url = '?' + query;
        }

        return axios.get(url);
    }
    else if(type === 'POST'){
        return axios.post(url,data);
    }

}