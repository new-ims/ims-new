import { Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom, filter, take, map } from 'rxjs';

export function waitFor<T>(signal: Signal<T>, predicate: (value: T) => boolean): Promise<void> {
  const signal$ = toObservable(signal);
  return firstValueFrom(signal$.pipe(
    filter(predicate),
    take(1),
    map(() => {})
  ));
}