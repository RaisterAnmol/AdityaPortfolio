import * as types from './windowTypes';

export const initialState = {
  windows: {}, // Map of appId -> { id, isOpen, isMinimized, isMaximized, zIndex }
  activeId: null,
  maxZIndex: 10
};

export function windowReducer(state, action) {
  switch (action.type) {
    case types.OPEN_WINDOW: {
      const { id } = action.payload;
      const nextZIndex = state.maxZIndex + 1;
      const existing = state.windows[id] || {
        id,
        isMaximized: false
      };

      return {
        ...state,
        windows: {
          ...state.windows,
          [id]: {
            ...existing,
            isOpen: true,
            isMinimized: false,
            zIndex: nextZIndex
          }
        },
        activeId: id,
        maxZIndex: nextZIndex
      };
    }

    case types.CLOSE_WINDOW: {
      const { id } = action.payload;
      if (!state.windows[id]) return state;

      const updatedWindows = { ...state.windows };
      updatedWindows[id] = {
        ...updatedWindows[id],
        isOpen: false
      };

      // Determine next active window
      const openRemaining = Object.values(updatedWindows)
        .filter(w => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      return {
        ...state,
        windows: updatedWindows,
        activeId: openRemaining.length > 0 ? openRemaining[0].id : null
      };
    }

    case types.MINIMIZE_WINDOW: {
      const { id } = action.payload;
      if (!state.windows[id]) return state;

      const updatedWindows = { ...state.windows };
      updatedWindows[id] = {
        ...updatedWindows[id],
        isMinimized: true
      };

      // Recalculate focus
      const openRemaining = Object.values(updatedWindows)
        .filter(w => w.isOpen && !w.isMinimized)
        .sort((a, b) => b.zIndex - a.zIndex);

      return {
        ...state,
        windows: updatedWindows,
        activeId: openRemaining.length > 0 ? openRemaining[0].id : null
      };
    }

    case types.MAXIMIZE_WINDOW: {
      const { id } = action.payload;
      if (!state.windows[id]) return state;

      const updatedWindows = { ...state.windows };
      updatedWindows[id] = {
        ...updatedWindows[id],
        isMaximized: !updatedWindows[id].isMaximized
      };

      return {
        ...state,
        windows: updatedWindows
      };
    }

    case types.FOCUS_WINDOW: {
      const { id } = action.payload;
      if (!state.windows[id]) return state;

      const nextZIndex = state.maxZIndex + 1;
      const updatedWindows = { ...state.windows };
      updatedWindows[id] = {
        ...updatedWindows[id],
        isMinimized: false,
        zIndex: nextZIndex
      };

      return {
        ...state,
        windows: updatedWindows,
        activeId: id,
        maxZIndex: nextZIndex
      };
    }

    case types.MINIMIZE_ALL: {
      const updatedWindows = {};
      Object.keys(state.windows).forEach(id => {
        updatedWindows[id] = {
          ...state.windows[id],
          isMinimized: true
        };
      });

      return {
        ...state,
        windows: updatedWindows,
        activeId: null
      };
    }

    default:
      return state;
  }
}
