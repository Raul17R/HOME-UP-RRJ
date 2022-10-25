

const taskList = (state = [], action) => {
    if(action.type === 'SET_TASK'){
        return action.payload;
    }
    return state;
}

export default taskList;