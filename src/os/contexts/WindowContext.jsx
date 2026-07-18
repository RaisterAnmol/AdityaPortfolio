import React, { createContext, useContext, useReducer } from 'react';
import { windowReducer, initialState } from '../store/windowReducer';
import * as types from '../store/windowTypes';
import { useOS } from './OSContext';

const WindowContext = createContext(null);

export function WindowProvider({ children }) {
  const [state, dispatch] = useReducer(windowReducer, initialState);
  const { playSound } = useOS();

  const openWindow = (id) => {
    dispatch({ type: types.OPEN_WINDOW, payload: { id } });
    playSound('window');
  };

  const closeWindow = (id) => {
    dispatch({ type: types.CLOSE_WINDOW, payload: { id } });
    playSound('click');
  };

  const minimizeWindow = (id) => {
    dispatch({ type: types.MINIMIZE_WINDOW, payload: { id } });
    playSound('click');
  };

  const maximizeWindow = (id) => {
    dispatch({ type: types.MAXIMIZE_WINDOW, payload: { id } });
    playSound('click');
  };

  const focusWindow = (id) => {
    dispatch({ type: types.FOCUS_WINDOW, payload: { id } });
  };

  const minimizeAll = () => {
    dispatch({ type: types.MINIMIZE_ALL });
    playSound('click');
  };

  return (
    <WindowContext.Provider
      value={{
        windows: state.windows,
        activeId: state.activeId,
        openWindow,
        closeWindow,
        minimizeWindow,
        maximizeWindow,
        focusWindow,
        minimizeAll
      }}
    >
      {children}
    </WindowContext.Provider>
  );
}

export function useWindows() {
  const context = useContext(WindowContext);
  if (!context) throw new Error('useWindows must be used within a WindowProvider');
  return context;
}
