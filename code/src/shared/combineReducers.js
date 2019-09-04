export default reducers => (state, action) => reducers.reduce((nextState, reducer) => reducer(action, nextState), state)
