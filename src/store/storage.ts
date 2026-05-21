import createWebStorage from "redux-persist/lib/storage/createWebStorage";

const createWebStorageFn = (createWebStorage as any)?.default ?? createWebStorage;

const createNoopStorage = () => ({
  getItem: (_key: string) => Promise.resolve(null),
  setItem: (_key: string, value: unknown) => Promise.resolve(value),
  removeItem: (_key: string) => Promise.resolve(),
});

const storage =
  typeof window !== "undefined"
    ? createWebStorageFn("local")
    : createNoopStorage();

export default storage;
