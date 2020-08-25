/* 
type&header:
    employee: /employee
    employer: /employer
!header:
    /employeeinfo
    /employerinfo
 */
export const getRedirectTo = (type, header) => {
    let path = ''
    if(type==='employee'){//type
        path = '/employee'
    }else{
        path = '/employer'
    }

    if(!header){
        path += 'info'
    }
    return path
}