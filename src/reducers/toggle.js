const toggleReducer = (state = 'map', action) => {
    // eslint-disable-next-line default-case
    switch (action.type) {
        case 'TOGGLE':
            
            {if (state.state !== 'map') {
            console.log('should return map. The current state is', state.state)
            return {state: 'map'}
            } else{
                console.log('should return card', console.log("the current state is", state.state))
                return {state: 'card'}
            }}
        default:
           return state;
        
    }
};

export default toggleReducer;