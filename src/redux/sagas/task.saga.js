import axios from "axios";
import {put, takeLatest} from "redux-saga/effects";

function* fetchTask() {
    try {
        const config = {
            headers: { 'Contrnt-Type' : 'application/json' },
            withCredentials: true,
        }
        const taskList = yield axios.get('/api/task', config);
        yield put ({type:'SET_TASK', payload: taskList.data});
    } catch(error){
        console.log('tasks: ', error)
    }
}

function* taskSaga() {
    yield takeLatest('FETCH_TASK', fetchTask)
}
export default taskSaga;