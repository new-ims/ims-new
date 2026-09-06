import { signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { initialUserSlice } from './user.slice';
import { updateState, withDevtools } from '@angular-architects/ngrx-toolkit';
import { Adapter } from '@common/adapter';

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialUserSlice),
  withMethods((store) => ({
    setUserInfo(userInfo: Adapter.UserInfo) {
      updateState(store, '[User] Set User Info', { userInfo });
    }
    })),
    withDevtools('UserStore')
);