/* eslint-disable react-hooks/exhaustive-deps */
import { DependencyList, useEffect, useReducer, useState } from 'react';
import axios, { AxiosRequestConfig, AxiosError } from 'axios';

/**
 * 
 * @module useAxios
 * @description custom hook for making API calls using Axios
 * 
 * @param {UseAxiosConfig} config - the configuration object for the Axios request,
 * including options to skip requests if needed.
 * @param {DependencyList} dependencies - an array of dependencies that trigger 
 * the request when changed.
 * 
 * @returns {UseAxiosResponse} - a tuple containing the state of the request
 * and control functions.
 * 
 * @example
 * const dependencies = [postId];
 * const config = {
 *   url: `/posts/${postId}`,
 *   method: 'GET',
 *   // ...other Axios config options...
 * };
 * 
 * const [state, controls] = useAxios<Post, ErrorData>(config, dependencies);
 * 
 * // Access request state
 * if (state.type === 'loading') console.log('Loading...');
 * else if (state.type === 'success') console.log('Post data:', state.data);
 * else if (state.type === 'error) console.error('Error:', state.data.message);
 * 
 * // Controlling the request
 * controls.rerun(); // Manually trigger the request again
 */

export interface Idle {
    type: 'idle';
    data: null;
}

export interface Success<T> {
    type: 'success';
    data: T;
}

export interface Loading {
    type: 'loading';
    data: boolean;
}

export interface Err<T> {
    type: 'error';
    data: AxiosError<T>;
}

export interface UseAxiosControls {
    rerun: () => void;
}
export type UseAxiosState<S, U> = Idle | Success<S> | Loading | Err<U>;
export type UseAxiosResponse<S, U> = [UseAxiosState<S, U>, UseAxiosControls];

export interface UseAxiosOptions {
    skipRequest?: () => boolean;
    skipSubsequentRequests?: () => boolean;
}
export type UseAxiosConfig = AxiosRequestConfig & UseAxiosOptions;

// creating state utility functions for diff. request states
const idle = (): Idle => ({ type: 'idle', data: null });
const success = <T>(data: T): Success<T> => ({
    type: 'success',
    data,
});
const loading = (): Loading => ({ type: 'loading', data: true });
const error = <T>(err: AxiosError<T>): Err<T> => ({ type: 'error', data: err });

// reducer function for managing state of API requests
const reducer = <S, U>(state: UseAxiosState<S, U>, action: UseAxiosState<S, U>): UseAxiosState<S, U> => {
    switch (action.type) {
        case 'idle':
        case 'success':
        case 'loading':
        case 'error':
            return action;
        default:
            return state;
    }
};

export const useAxios = <S = any, U = any>(
    config: UseAxiosConfig,
    dependencies: DependencyList
): UseAxiosResponse<S, U> => {
    const { skipRequest = () => false, skipSubsequentRequests = () => false, ...axiosConfig } = config;

    const [state, dispatch] = useReducer(reducer, skipRequest() ? idle() : loading());
    const [prevDeps, setPrevDeps] = useState(dependencies);
    const [rerun, setRerun] = useState(false);

    if (!areHookInputsEqual(dependencies, prevDeps)) {
        dispatch(skipRequest() ? idle() : loading());
        setPrevDeps(dependencies);
    }

    const request = () => {
        dispatch(loading());
        const source = axios.CancelToken.source();
        const promise = axios
            .request({
                ...axiosConfig,
                cancelToken: source.token,
                headers: {
                    ...axiosConfig.headers,
                    'Access-Control-Allow-Origin': '*'
                }
            })
            .then((res) => dispatch(success(res.data)))
            .catch((err) => {
                if (axios.isCancel(err)) return;
                dispatch(error(err));
            });

        return { source, promise };
    };

    useEffect(() => {
        if (skipRequest()) return;
        const { source } = request();
        return () => source.cancel();
    }, dependencies);

    useEffect(() => {
        if (!rerun) return;
        const { source, promise } = request();
        promise.then(() => setRerun(false));
        return () => source.cancel();
    }, [rerun]);

    const controls = {
        rerun: () => setRerun(true),
    };

    return [state, controls] as UseAxiosResponse<S, U>;
};

const areHookInputsEqual = (
    nextDeps: DependencyList,
    prevDeps: DependencyList
) => {
    for (let i = 0; i < prevDeps.length && i < nextDeps.length; i++) {
        if (Object.is(nextDeps[i], prevDeps[i])) {
            continue; // skip comparing equal dependencies
        }
        return false;
    }
    return true;
};

export default useAxios;
