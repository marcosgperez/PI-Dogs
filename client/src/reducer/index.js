
const initialState = {
    payload : [],
    loading: false,
    temperaments: [],
    payloadBackUp: [],
    setErr: false
}

export default function rootReducer (state = initialState, action) {
    switch(action.type) {
        // Set loading true
        case 'AWAIT_DOGS':
            return {
                ...state,
                setErr: false,
                loading: true
            };
        // Set loading true
        case 'AWAIT_TEMPS':
            return {
                ...state,
                setErr: false,
                loading: true
            };
        // Data on Board
        case 'DATA_DOGS':
            return {
                ...state,
                loading: false,
                setErr: false,
                payload: action.payload,
                payloadBackUp: action.payload
            };
        // Data on Board
        case 'DATA_TEMPS':
            return {
                ...state,
                loading: false,
                setErr: false,
                temperaments: action.temperaments
            };
        // Data on Board
        case 'DATA_QUERY':
            return {
                ...state,
                loading: false,
                setErr: false,
                payload: action.payload
            };
        // Data on Board
        case 'DATA_BYID':
            return {
                ...state,
                loading: false,
                setErr: false,
                payload: action.payload
            };
        // Data on Board
        case "POST_DOG" :
            return {
                ...state,
                setErr: false,
            };
        // Data on Board
        case 'SORT_BY' :
            if (action.payload === 'AZ' || action.payload === 'ZA') {
                const filt = action.payload === 'AZ' ? state.payload.sort((a, b) => {
                    if (a.name > b.name) return 1;
                    if (b.name > a.name) return -1;
                    return 0;
                }) : state.payload.sort((a, b) => {
                    if (a.name > b.name) return -1;
                    if (b.name > a.name) return 1;
                    return 0;
                });
                return {
                    ...state,
                    setErr: false,
                    payload: filt
                };
            };
            if (action.payload === 'UP' || action.payload === 'DOWN') {
                const filtWeight = action.payload === 'UP' ? state.payload.sort((a, b) => {
                    let minA = a.weight.split ('-');
                    let minB = b.weight.split ('-');
                    return minA[0] - minB[0];
                }) : state.payload.sort((a, b) => {
                    let minA = a.weight.split ('-');
                    let minB = b.weight.split ('-');
                    return minB[0] - minA[0];
                });
                return {
                    ...state,
                    setErr: false,
                    payload: filtWeight
                };
            };
            if (action.payload === 'MYDB') {
                return {
                    ...state,
                    setErr: false,
                    payload: state.payloadBackUp.filter(e => e.id.length === 36)
                }
            };
            if (action.payload === 'API') {
                return {
                    ...state,
                    setErr: false,
                    payload: state.payloadBackUp.filter ( e=> e.id.length < 36)
                }
            }
            if (action.payload === 'default') {
                return {
                    ...state,
                    setErr: false,
                    payload: state.payloadBackUp.sort((a, b) => {
                        if (a.name > b.name) return 1;
                        if (b.name > a.name) return -1;
                        return 0;
                    })
                };
            }
            else {
                const dogs = state.payload;
                const filtByTemp = dogs.filter(e => {
                    if (e.temperament !== undefined) {
                        return e.temperament.includes(action.payload)
                    }
                    else {
                        return dogs
                    }
                })
                return {
                    ...state,
                    setErr: false,
                    payload: filtByTemp[0] !== undefined ? filtByTemp : []
                }
            };
        case 'ERROR' :
            return {
                ...state,
                setErr: true
            }
        // Default case
        default:
            return {
                ...state
            };
    };
};  