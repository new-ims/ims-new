import { inject, Injector, runInInjectionContext } from "@angular/core";

export function getContextRunner() {
    const injector = inject(Injector);
    return <T>(action: () => T) => runInInjectionContext(injector, action);
}
