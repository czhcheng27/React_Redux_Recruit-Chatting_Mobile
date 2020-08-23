/* 
a function module which can return promise object
*/
import axios from 'axios'
export default function ajax(url, data={}, type='GET'){
    if(type==='GET'){
        //data:{username: Tom, password: 123}
        //str: username=Tom&password=123
        let str = ''
        Object.keys(data).forEach(key => {
            str += key + '=' + data[key] + '&'
        })
        if(str){
            str = str.substring(0, str.length-1)
        }
        return axios.get(url+'?'+str)
    }else{
        return axios.post(url, data)
    }
}