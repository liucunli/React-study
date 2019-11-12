/*
* 信息未完善：
* bossInfo
* userInfo
*
* 信息已完善
* boss
* user
* */
export function getRoute(type,header) {
    console.log('type',type);
    let path = '/main';
    if(type === 'Boss'){
        path += '/boss';
    } else if(type === 'User'){
        path += '/user';
    }
    if(!header){
        path += 'Info'
    }
    return path;
}