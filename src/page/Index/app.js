import { connect } from 'react-redux'
import Index from './index'
import { changePageStatus,setScrollTop } from '../../store/actions.js'   
const mapStateToProps=(state)=>{
    return {
        menuStatus: state.comStatus.menuStatus,
        pageStatus: state.comStatus.pageStatus,
        scrollTop: state.comStatus.scrollTop
    }
}
const mapDispatchToProps=(dispatch)=>{
    return {
        setScrollTop: (data) => dispatch(setScrollTop(data)),
        changePageStatus: (data) => dispatch(changePageStatus(data))
    };
}
export default connect(mapStateToProps, mapDispatchToProps)(Index)
