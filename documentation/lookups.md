## Loading lookups

Lookups are stored in a service cache. Before you use a lookup:

1. Make sure the lookup is loaded into the cache.
2. Get the lookup value from the cache.

### Load lookups for a step component

For a step component, define the required lookups in the configuration file:

```typescript
requiredLookups: ['lookup1', 'lookup2'];
```

> The available lookups are defined in the process lookup table. More details will be added later.

By default, the lookups are loaded before the enter step method runs.

### Load a lookup after the enter step method

Sometimes, a lookup depends on data that is created during the enter step method. In this case, set its timing to `afterEnter`:

```typescript
requiredLookups: ['lookup1', { key: 'lookup2', timing: 'afterEnter' }];
```

In this example:

- `lookup1` is loaded before the enter step method.
- `lookup2` is loaded after the enter step method.

### Load lookups without a configuration file

Reusable components, pages, and other items may not have a configuration file. In this case, call `awaitLookups` directly:

```typescript
async function doSomething() {
  await awaitLookups(processConfig, ['lookup1', 'lookup2']);
}
```

The promise returned by `awaitLookups` resolves after all required lookups are loaded and stored in the cache.

If a lookup cannot be loaded, the promise rejects with the loading error.

## Getting lookup values

Use the `getLookup` function to get a lookup value. The function returns a `Signal<T>`:

```typescript
getLookup(config, 'lookup1'): Signal<Lookup1Type>
```

Make sure the lookup is loaded before you read the signal. If it is not loaded, the signal returns the lookup's default value. The signal updates when the lookup data is available.
