import { createContext, useContext, useReducer, useEffect, type ReactNode, type Dispatch } from 'react';
import { DEV_DRIVERS, DEV_VEHICLES, DEV_ADMIN } from '@/data/dev-seed';
import { isSupabaseConfigured } from '@/lib/supabase/client';
import { fetchAllData } from '@/lib/supabase/queries';
import type { Driver, Vehicle, User, AppState, Action } from '@/types';
import { appReducer, initialState } from './app-reducer';

// ---- Context ----

const StateContext = createContext<AppState>(initialState);
const DispatchContext = createContext<Dispatch<Action>>(() => {});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    if (!isSupabaseConfigured) {
      dispatch({ type: 'HYDRATE', payload: {
        drivers: DEV_DRIVERS as Driver[],
        vehicles: DEV_VEHICLES as Vehicle[],
        shifts: [],
        users: [DEV_ADMIN as User],
        trips: [],
        closedPayroll: [],
        dataSource: 'mock' as const,
      }});
      return;
    }
    fetchAllData()
      .then(data => dispatch({ type: 'HYDRATE', payload: { ...data, dataSource: 'supabase' as const } }))
      .catch(err => {
        console.error('Failed to load from Supabase:', err);
        dispatch({ type: 'HYDRATE', payload: {
          drivers: [],
          vehicles: [],
          shifts: [],
          users: [],
          trips: [],
          closedPayroll: [],
          dataSource: 'supabase' as const,
        }});
      });
  }, []);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}

export function useAppState() {
  return useContext(StateContext);
}

export function useAppDispatch() {
  return useContext(DispatchContext);
}
