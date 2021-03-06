// Fetching
import axios from 'axios';

// URLS
const dogs = 'http://localhost:3001/dogs';
const temps = 'http://localhost:3001/dogs/temperament';

export function getDogs (valor) {
    return function (dispatch) {
        dispatch(awaitDogs());
        axios.get(dogs)
            .then(r => r.data)
            .then(d => dispatch(dataDogs(d)))
        .catch(e => console.log(e));
    };
};

// Loading
export function awaitDogs () {
    return {
        type: 'AWAIT_DOGS',
        loading: true,
    };
};

export function awaitTemps () {
    return {
        type: 'AWAIT_TEMPS',
        loading: true,
    };
};

export function dataDogs (payload) {
    try {
        return {
            type: 'DATA_DOGS',
            loading: false,
            payload
        }
    }
    catch(error){
        console.log("Esta fallando la ruta de detalle", error)
    }
};

export function getTemps (payload) {
    return function (dispatch) {
        dispatch(awaitTemps())
        axios.get(temps)
            .then(r => r.data)
            .then(d => dispatch(dataTemps(d)))
        .catch(e => console.log(e));
    };
}

export function dataTemps (payload) {
    try {
        return {
            type: 'DATA_TEMPS',
            loading: false,
            temperaments: payload
        }
    }
    catch(error){
        console.log("Esta fallando la ruta de detalle", error)
    }
};

export function getQueryName (payload) {
    return function (dispatch) {
        axios.get(`${dogs}?name=${payload}`)
            .then(r => r.data)
            .then(d => dispatch(dataQuery(d)))
        .catch(e => dispatch(setError()));
    };
}

export function dataQuery (payload) {
    try {
        return {
            type: 'DATA_QUERY',
            loading: false,
            payload
        }
    }
    catch(error){
        console.log("Esta fallando la ruta de detalle", error)
    }
};

export function getById (id) {
    return function (dispatch) {
        dispatch(awaitDogs());
        axios.get(`http://localhost:3001/dogs/${id}`)
            .then(r => r.data)
            .then(d => dispatch(dataById(d)))
        .catch(e => console.log(e));
    };
}

export function awaitById () {
    return {
        type: 'AWAIT_BYID',
        loading: true,
    }
};

export function dataById  (payload) {
    try {
        return {
            type: 'DATA_BYID',
            loading: false,
            payload
        }
    }
    catch(error){
        console.log("Esta fallando la ruta de detalle", error)
    }
}

export function postNewDog(payload) {
    return async function (dispatch) {
        const respuesta = await axios.post("http://localhost:3001/dog", payload);
        return {
            type: 'POST_DOG',
            payload: respuesta
        }
    }
}

export function sortBy (payload) {
    try {
        return {
            type: 'SORT_BY',
            loading: false,
            payload
        }
    }
    catch(error){
        console.log("Esta fallando la ruta de detalle", error)
    }
}

export function setError (payload) {
    try {
        return {
            type: 'ERROR',
            loading: false,
        }
    }
    catch(error){
        console.log("Esta fallando la ruta de detalle", error)
    }
}