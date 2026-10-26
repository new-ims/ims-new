import { ResourceRef, Signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { firstValueFrom, filter, take, map } from 'rxjs';

export function waitForSignal<T>(signal: Signal<T>, predicate: (value: T) => boolean): Promise<void> {
  const signal$ = toObservable(signal);
  return firstValueFrom(signal$.pipe(
    filter(predicate),
    take(1),
    map(() => {})
  ));
}

export function waitForResource<T>(resource: ResourceRef<T>): Promise<void> {
  // we need to create a promise that is:
  // 1. resolved when the resource reaches the 'resolved' status
  // 2. rejected if the resource reaches the 'error' status

  const status$ = toObservable(resource.status);
  return firstValueFrom(status$.pipe(
    filter(status => status === 'resolved' || status === 'error'),
    take(1),
    map(status => {
      if (status === 'error') {
        throw resource.error();
      }
    })
  ));
}

export function waitForResources(resources: ResourceRef<unknown>[]): Promise<void> {
  return Promise.all(resources.map(waitForResource)).then(() => {});
}