import { combineReducers } from 'redux'
import {MENU_STATUS,PAGE_STAUTS,CLASS_LIST,SCROLL_TOP} from './actions'
const initState = {
  menuStatus: false,
  scrollTop:0,
  pageStatus: {
    List:[],
    Page:1,
    Limit: 10,
    KeyWord:'',
    ClassId:'',
    Total:0,
    HasMore:true
  },
  classList:[]
}
function comStatus(state = initState, action) {
  switch (action.type) {
    case MENU_STATUS:
      return Object.assign({}, state, {
        menuStatus: action.data
      });//导航展开状态
    case PAGE_STAUTS:
      return Object.assign({}, state, {
        pageStatus: action.data
      });//文章列表及状态
    case CLASS_LIST:
      return Object.assign({}, state, {
        classList: action.data
      });//分类列表
    case SCROLL_TOP:
      return Object.assign({}, state, {
        scrollTop: action.data
      });//滚动位置
    default:
      return state
  }
}
export default combineReducers({
  comStatus
})