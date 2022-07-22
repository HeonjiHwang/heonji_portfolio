const initialState = {
    mOverData: {},
    isFocus: false
};

export const MOVERDATA = "SETMOVERDATA";
export const ISFOCUS = 'ISFOCUS';

export const setMoverData = mOverData => ({type:MOVERDATA, mOverData});
export const setIsFocus = isFocus => ({type:ISFOCUS, isFocus})

const gallery = (state = initialState, action) => {
    switch(action.type){
        case MOVERDATA:
            return {
                ...state,
                mOverData: action.mOverData
            }
        case ISFOCUS:
            return {
                ...state,
                isFocus: action.isFocus
            }
        default:
            return state;
    }
}

export default gallery;