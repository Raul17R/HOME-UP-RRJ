import axios from "axios";
import {put, takeLatest} from "redux-saga/effects";


function* editTask(action){
    try{
        // const task = yield axios.put(`/api/task/${action.payload.id}`);
        yield axios.put(`/api/task/${action.payload.id}`, action.payload);
        // if(action.history) {
        //     action.history.goBack();
        // }
        // yield put ({type: 'EDIT_TASK', payload: task.data})
    } catch(e) {
        console.log('error in task to edit saga',e)
    }
}

function* taskSaga() {
    yield takeLatest('EDIT_TASK', editTask);
}
export default taskSaga;
// export default editTask;