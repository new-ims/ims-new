# Immutable process updates with Immer

## Part 1: Options, requirements, and decision

### The problem

We need to update deeply nested process models without modifying previous
versions. Existing code often deep-clones a process, mutates the clone, and returns
it. We want to avoid cloning the entire model while keeping update code simple
and familiar.

### Requirements considered

- **Deep models:** Updates may reach more than six levels into an object.
- **Modest collection sizes:** Arrays usually contain tens of items, occasionally
  a few hundred, rather than thousands.
- **Frequent updates:** Unchanged parts of the model should be reused instead of
  copied on every update.
- **A large team with mixed experience:** Requiring everyone to master nested
  spreads and functional transformations would increase the training burden and
  the risk of mistakes.
- **Migration from mutable code:** Existing assignments, loops, and array
  mutations should remain recognizable where possible.
- **Immutable results:** The original process must remain unchanged. Updates
  should provide structural sharing, as carefully written spreads and array
  operations would.
- **TypeScript and Angular integration:** Keep ordinary typed objects and arrays
  that work with the existing NgRx Signals store, forms, and API models.

### Packages and approaches considered

| Package or approach | What it offers | Fit for our requirements |
| --- | --- | --- |
| **Immer** (`immer`) | Mutation-style draft recipes that produce immutable plain objects and arrays with structural sharing. Default auto-freezing, TypeScript draft types, and optional patches. | Best fit: readable deep updates and a straightforward migration from mutable code. |
| **Mutative** (`mutative`) | A similar draft-based API with a performance-focused implementation. Auto-freezing is opt-in. | A credible alternative if profiling demonstrates a bottleneck. Published speed comparisons are workload- and configuration-dependent. |
| **optics-ts** (`optics-ts`) | Typed, reusable paths and transformations through nested structures using optics. | Useful for composable transformations, but adds functional concepts and a learning curve that do not address our main team constraint. |
| **Immutable.js** (`immutable`) | Persistent collections such as `Map` and `List` that share internal storage across versions. | More compelling for very large collections or extensive snapshot retention. Its collection APIs and conversion boundaries add unnecessary complexity here. |
| **Manual spreads and array methods** | Dependency-free immutable updates using object spreads, `map`, `filter`, and `slice`. | Still appropriate for simple updates, but deep, multi-field changes become verbose and easy to get wrong. |
| **Normalization and entity helpers** | Flatter state organized by entity ID; NgRx Signals entity helpers are one option. | Useful when independently updated entities justify a state-model change, but not required solely because a model is deep. Can coexist with Immer. |
| **Deep clone, then mutate** | Familiar update code operating on a complete copy. | Not our default: it copies unchanged data, loses structural sharing, and creates unnecessary allocation and garbage-collection work. |

Normalization improves lookup and update locality, but a plain object used as an
entity dictionary is not a persistent map: copying a large dictionary still has
a cost. Similarly, optics and draft libraries do not eliminate ordinary array
copying costs.

`Readonly<T>` and `Object.freeze()` are safeguards, not update strategies.
`Readonly<T>` is shallow and compile-time only; `Object.freeze()` is shallow at
runtime unless applied recursively.

### Final verdict: Immer

**Use Immer for complex, deep process updates.** Keep existing shallow spreads
where they are already clear.

The main challenge is maintainability and safe migration, not the cost of
updating enormous collections. Immer lets developers keep familiar imperative
logic while it manages immutable copying:

> Mutate only the draft inside the recipe. Treat published state as read-only.

This is a smaller, clearer rule to teach than manually reconstructing every
ancestor of every changed property.

Immer is preferred over Mutative as the starting point because of its established
ecosystem, documentation, and familiarity, not because it is guaranteed to be
faster. If profiling later identifies draft processing as a bottleneck, compare
both against real update recipes with equivalent freezing and patch settings.

No state-library replacement is needed: produce the next process value and
publish it through the existing NgRx Signals update mechanism. Structural sharing
helps reactive consumers most when they depend on narrower branches rather than
the entire process root.

## Part 2: Simple usage examples

### Install and import

The npm package is `immer`. TypeScript definitions are included.

```sh
npm install immer
```

```ts
import { produce } from 'immer';
```

### Replace a deep clone with a recipe

The following model is deliberately small. The same pattern works with deeper
paths.

```ts
interface Process {
  readonly customer: {
    readonly contact: {
      readonly address: {
        readonly city: string;
        readonly verified: boolean;
      };
    };
  };
  readonly workflow: {
    readonly requiresReview: boolean;
  };
  readonly documents: ReadonlyArray<{
    readonly id: string;
    readonly approved: boolean;
  }>;
}

function updateCity(process: Process, city: string): Process {
  return produce(process, draft => {
    draft.customer.contact.address.city = city;
    draft.customer.contact.address.verified = false;
    draft.workflow.requiresReview = true;
  });
}
```

The input model is read-only, but Immer gives the callback a mutable draft type.
There is no need to deep-clone the process or manually spread each ancestor.

### Update an array item with familiar code

```ts
function approveDocument(process: Process, documentId: string): Process {
  return produce(process, draft => {
    const document = draft.documents.find(item => item.id === documentId);

    if (document) {
      document.approved = true;
    }
  });
}
```

If no document matches, the recipe makes no changes and returns the original
process reference. Whether a missing document should instead be reported as an
error is a business rule, not something Immer decides.

Draft arrays also support familiar operations:

```ts
function addDocument(process: Process, documentId: string): Process {
  return produce(process, draft => {
    draft.documents.push({
      id: documentId,
      approved: false,
    });
  });
}
```

### Observe structural sharing

```ts
const previous: Process = {
  customer: {
    contact: {
      address: { city: 'Tel Aviv', verified: true },
    },
  },
  workflow: { requiresReview: false },
  documents: [{ id: 'doc-1', approved: false }],
};

const next = updateCity(previous, 'Haifa');

console.assert(previous.customer.contact.address.city === 'Tel Aviv');
console.assert(next.customer.contact.address.city === 'Haifa');

// Changed branches receive new references.
console.assert(next !== previous);
console.assert(next.customer !== previous.customer);
console.assert(next.workflow !== previous.workflow);

// Unchanged branches retain their references.
console.assert(next.documents === previous.documents);

const unchanged = produce(previous, draft => {
  draft.customer.contact.address.city = 'Tel Aviv';
});

console.assert(unchanged === previous);
```

### Migrating existing helpers

A synchronous helper that mutates only its supplied argument can operate on a
draft:

```ts
function setAddressCity(
  address: { city: string; verified: boolean },
  city: string,
): void {
  address.city = city;
  address.verified = false;
}

function updateCityWithHelper(process: Process, city: string): Process {
  return produce(process, draft => {
    setAddressCity(draft.customer.contact.address, city);
  });
}
```

Audit helpers before reusing them: they must not mutate captured original state,
retain a draft for later use, or perform asynchronous work.

### Team conventions

1. Treat published state as read-only; reinforce this with readonly model types.
2. Mutate only draft-owned data inside a recipe.
3. Batch related changes into one recipe rather than producing a version for
   each assignment or loop iteration.
4. Keep recipes synchronous and free of side effects. Complete asynchronous work
   first, then apply its result to the appropriate current state.
5. Either mutate the draft or return a replacement value, not both. Prefer block
   callbacks with no returned value for ordinary updates.
6. Never store or use a draft after the callback finishes.
7. Start with default auto-freezing. Change it only for a measured reason.

In particular, use a block callback for `push`: an expression callback would
return the new array length as well as mutate the draft.

```ts
const next = produce(previous, draft => {
  draft.documents.push({ id: 'doc-2', approved: false });
});
```

## Part 3: How Immer works under the hood

### 1. A draft is a proxy, not a deep clone

For ordinary objects and arrays, Immer exposes a JavaScript `Proxy` around the
base value. The proxy intercepts property reads and writes.

Nested drafts are created lazily as draftable values are accessed. Starting a
recipe does not eagerly duplicate the entire process.

### 2. Writes trigger copy-on-write behavior

When a property changes, Immer prepares a shallow copy of that container and
tracks the change instead of writing into the original object. Additional edits
to that container within the same recipe reuse its working copy.

For example:

```text
process
  customer
    contact
      address
        city
  workflow
  documents
```

Changing only `city` requires new versions of `address`, `contact`, `customer`,
and the process root. The unchanged `workflow` and `documents` branches can be
shared with the previous version.

### 3. Finalization builds the next version

After the callback returns, Immer finalizes the draft:

- Changed containers become part of the next result.
- Changed descendants are linked into their new ancestors.
- Unchanged branches reuse their original references.
- A recipe with no changes can reuse the original root.
- Draft proxies are revoked and must not be used afterward.

This is **structural sharing**. It provides the behavior of a carefully written
immutable update without requiring developers to manually rebuild every path.
It does not promise exactly the same allocations as an arbitrary hand-written
spread, `map`, or `filter` implementation.

### 4. Auto-freezing adds runtime protection

By default, Immer freezes supported objects and arrays in the produced result to
help prevent accidental mutation outside recipes.

Freezing is separate from structural sharing and can add processing cost.
Because branches are shared, it can also freeze objects reachable from the
original input; preserving the original's data does not mean leaving its
freezability unchanged.

Readonly TypeScript types remain useful: runtime freezing does not replace
compile-time checks.

### 5. There are still copying and proxy costs

Immer is not a specialized persistent map or vector implementation:

- Changing an ordinary array generally requires copying its element references.
- Changing a plain object requires copying its properties.
- Searching an array still visits elements.
- Reading through drafts adds proxy overhead.
- Freezing and optional patch generation add work.

The cost depends on the widths of containers along the updated paths as well as
their depth. For our modest arrays, readability and correctness are the primary
reasons to choose Immer. If a real hot path emerges, profile it; searches can
sometimes be performed on the original data before entering the recipe.

### 6. Important boundaries

- **Tree-shaped state:** Immer expects a unidirectional tree, without circular
  references or the same object appearing at multiple paths. It is not a general
  graph-update engine.
- **External values:** Assigning an external object into a draft does not turn
  that external object into a draft. Do not then mutate it assuming it is
  protected. Construct its final value before insertion, or otherwise manage
  ownership explicitly.
- **Special objects:** Do not assume classes, dates, or other special values
  behave like plain draftable objects. Classes need explicit support; replace
  values such as dates rather than mutating their internals. `Map` and `Set`
  support requires enabling Immer's corresponding plugin.
- **Optional patches:** Immer can generate forward and inverse patches for
  history or undo workflows when patch support is enabled. Patches are optional
  and are not guaranteed to be the smallest possible change set.

## References

- [Immer documentation](https://immerjs.github.io/immer/)
- [Immer performance guidance](https://immerjs.github.io/immer/performance/)
- [Immer pitfalls](https://immerjs.github.io/immer/pitfalls/)
- [Immer on npm](https://www.npmjs.com/package/immer)
- [Mutative](https://github.com/unadlib/mutative)
- [optics-ts](https://github.com/akheron/optics-ts)
- [Immutable.js](https://immutable-js.com/)