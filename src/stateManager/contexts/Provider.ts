/**
 * @module contexts/Provider
 * 
 * @file
 * This file contains the implementation of the `Provider` component, which 
 * creates a context and provides access to the state manager's store.
 * 
 * The `Provider` component is responsible for managing the state store and making
 * it available to the components using the state manager. It creates a context 
 * using `createContext` from React and provides the store to the components through 
 * the context. The `useStore` hook allows components to access the store within the 
 * state manager.
 * 
 * @link https://react.dev/reference/react/createContext
 */

import { createContext, createElement, useContext, useRef } from 'react';
import type { FunctionComponentElement, ReactNode } from 'react';

import { createStore, getDefaultStore } from '../utils/store';

type Store = ReturnType<typeof createStore>

const StoreContext = createContext<Store | undefined>(undefined)

type Options = {
    store?: Store
}

/**
 * @function useStore
 * @description Custom hook that provides access to the state manager's store
 * @param {Options} options - Options for accessing the store
 * @return {Store} The state manager's store
 */
export const useStore = (options?: Options): Store => {
    const store = useContext(StoreContext);
    return options?.store || store || getDefaultStore(); // return specified store from options, else default store
}

/**
 * @function Provider
 * @description Creates a context and provides state manager's store to the components
 * @param {ReactNode} children - The child components wrapped by `Provider`
 * @param store - The store to be provided, else a default store
 * @return Element that wraps child components with StoreContext.Provider
 */
export const Provider = ({
    children,
    store,
}: {
    children?: ReactNode
    store?: Store
}): FunctionComponentElement<{ value: Store | undefined }> => {
    const storeRef = useRef<Store>();
    // If store is not provided and storeRef is empty, create a 
    // default store and assign it to storeRef.current
    if (!store && !storeRef.current) {
        storeRef.current = createStore();
    }
    return createElement(
        StoreContext.Provider,
        { value: store || storeRef.current },
        children
    );
}
