import { signalStore, withMethods, withState } from '@ngrx/signals';
import { initialUserSlice } from './login.slice';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Adapter } from '@common/adapter';
import { setIsHistorical, setLoginData, setProcessDisabled, setUserInfo } from './login.updaters';

export const LoginStore = signalStore(
  { providedIn: 'root' },
  withState(initialUserSlice),
  withMethods((store) => ({
    setUserInfo(userInfo: Adapter.UserInfo) {
      updateState(store, '[User] Set User Info', setUserInfo(userInfo));
    },
    setProcessDisabled(disabled: boolean) {
      updateState(store, 'Set Process Disabled', setProcessDisabled(disabled));
    },
    setIsHistorical(isHistorical: boolean) {
      updateState(store, 'Set Is Historical', setIsHistorical(isHistorical));
    }, 
    setLoginData(loginData: Adapter.LoginOutput) {
      updateState(store, 'Set Login Data', setLoginData(loginData));
    }
  })),
  withDevtools('LoginStore')
);