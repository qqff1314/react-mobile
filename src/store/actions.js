export const MENU_STATUS = 'MENU_STATUS';
export const PAGE_STAUTS = 'PAGE_STAUTS';
export const CLASS_LIST = 'CLASS_LIST';
export const SCROLL_TOP = 'SCROLL_TOP';
export const changeMenuStatus= data =>{
    return  {
        type: MENU_STATUS,
        data
    }
}
export const changePageStatus= data =>{
    return  {
        type: PAGE_STAUTS,
        data
    }
}
export const setClassList= data =>{
    return  {
        type: CLASS_LIST,
        data
    }
}
export const setScrollTop= data =>{
    return  {
        type: SCROLL_TOP,
        data
    }
}