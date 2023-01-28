# How to deep clone objects in JavaScript

The non-native way : [lodash cloneDeep function](https://lodash.com/docs/#cloneDeep).

Example :

```ts
const post = {
  title: "My awesome blog post",
  description: "...",
  date: new Date(),
  author: "doe-j",
};

const copy = _.cloneDeep(post);
```

Pro/cons :

- Not a native solution
- But easy to use
- Works with ObjectId fields (mongo …)

Now we can use `structuredClone` native function

Example :

```ts
const post = {
  title: "My awesome blog post",
  description: "...",
  date: new Date(),
  author: "doe-j",
};

const copy = structuredClone(post);
```

Pro/cons :

- Native solution
- Easy to use
- **Doesn’t works with MongoDB ObjectID fields**

## Related examples

Related examples are available here : [src/index.spec.ts](./src/index.spec.ts)

You can run the test suite with the following commands

```shell
corepack enable
pnpm i

# run a mongo instance
docker run -p 27017:27017 -d mongo

pnpm test
```
