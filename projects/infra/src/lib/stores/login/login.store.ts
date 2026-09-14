import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialUserSlice } from './login.slice';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Adapter } from '@common/adapter';

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initialUserSlice),
  withMethods((store) => ({
    setUserInfo(userInfo: Adapter.UserInfo) {
      updateState(store, '[User] Set User Info', { userInfo });
    },
    setProcessDisabled(disabled: boolean) {
      updateState(store, 'Set Process Disabled', { processDisabled: disabled });
    },
    setIsHistorical(isHistorical: boolean) {
      updateState(store, 'Set Is Historical', { isHistorical });
    }
  })),
  withDevtools('LoginStore')
);