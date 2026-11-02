## Ensuring the lookups are available and loaded
Lookups are cached in a service. When working with lookups there two things we need to consider:
1. Ensuring that the lookups are loaded and exist in the cache.
2. Getting them and using them.

In this section, we will discuss how to ensure that lookups are available and loaded before using them.
In the next section, we will talk about how to fetch their data and use it.


1. For step components, use the config file to define required lookups. 

```typescript
requiredLookups: ['lookup1', 'lookup2'];
```

>The lookups are defined in the process lookup table - To be described in detail later.


2. If the lookups should only be fetched **AFTER** the enter step method (for example, if the lookup getter depends on data that is calculated during the enter step), you should use the special way to request the lookup at after the enter step:

```typescript
requiredLookups: ['lookup1', { key: 'lookup2', timing: 'afterEnter' }]
```

3. If you build a reusable component or page, or anything that does not have a configuration file, you will need to manually invoke the API to ensure the lookup is avilable and loaded. 
```typescript
async function doSomething() {
    await awaitLookups(processConfig, ['lookup1', 'lookup2']);
}
```

the `awaitLookups` function returns a promise that resolves only after all the required lookups are loaded and cached. Also, if the load process fails, it will reject and throw the error that occurred during the loading phase.

## Getting the lookup values
In order to get a lookup value, use the `getLookup` function. This function returns a `Signal<T>`. 

You should always ensure that the lookup is available and loaded before attempting to read from this signal, otherwise the signal will temporarily return the default value defined for this lookup, but it will notify you when the data is loaded.

```typescript
getLookup(config, 'lookup1'): Signal<Lookup1Type>
```

