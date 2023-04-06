import { VIEW_SHOW_TABLE, VIEW_SHOW_LISTGROUP, CURRENT_SAVE, POPULATE_RESULT, CALC_CONFIG_MODE_COUNT, CALC_CONFIG_ITEMS_COUNT, IS_WSS_OPEN, MESSAGE, GET_ERROR } from '../types';
import axios from 'axios'

export const saveCurrent = (data) => async dispatch => {

    try {
        dispatch({
            type: CURRENT_SAVE,
            payload: data
        })

    }
    catch (e) {
        console.log(e);
    }
}

export const saveToMysql = (data) => async dispatch => {

    try {
        console.log("to save", data);
        const baseURL = "http://localhost/testservertrade/";
        axios.post(baseURL, {
            toSave: data,
        })
            .then(function (response) {
                const data = response.data;

                console.log("collection", data.collection);
                if (data.count > 0) {
                    const collection = data.collection;
                    //Save to state result
                    dispatch({
                        type: POPULATE_RESULT,
                        payload: collection
                    })

                } else {
                    console.log("collection is empty");
                }

            })
            .catch(function (error) {
                console.log(error);
            });

    }
    catch (e) {
        console.log(e);
    }

}

//View actions

export const showListGroup = (status) => async dispatch => {

    try {
        dispatch({
            type: VIEW_SHOW_LISTGROUP,
            payload: status
        })

    }
    catch (e) {
        console.log(e);
    }
}

export const showTable = (status) => async dispatch => {

    try {
        dispatch({
            type: VIEW_SHOW_TABLE,
            payload: status
        })

    }
    catch (e) {
        console.log(e);
    }
}

export const calcConfigModeCount = (count) => async dispatch => {

    try {
        dispatch({
            type: CALC_CONFIG_MODE_COUNT,
            payload: count
        })

    }
    catch (e) {
        console.log(e);
    }
}

export const calcConfigItemsCount = (count) => async dispatch => {

    try {
        dispatch({
            type: CALC_CONFIG_ITEMS_COUNT,
            payload: count
        })

    }
    catch (e) {
        console.log(e);
    }
}


export const stateWssOpen = (status) => async dispatch => {

    try {
        dispatch({
            type: IS_WSS_OPEN,
            payload: status
        })

    }
    catch (e) {
        console.log(e);
    }
}

export const setMessage = (message) => async dispatch => {

    try {
        dispatch({
            type: MESSAGE,
            payload: message
        })

    }
    catch (e) {
        console.log(e);
    }
}

export const error = (message) => async dispatch => {

    try {
        dispatch({
            type: GET_ERROR,
            payload: message
        })

    }
    catch (e) {
        console.log(e);
    }
}