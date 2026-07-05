function k(key, shared) {
  return (shared ? "shared:" : "personal:") + key;
}

export const storage = {
  async get(key, shared = false) {
    const raw = localStorage.getItem(k(key, shared));
    if (raw === null) throw new Error("not found");
    return { key, value: raw, shared };
  },
  async set(key, value, shared = false) {
    localStorage.setItem(k(key, shared), value);
    return { key, value, shared };
  },
  async delete(key, shared = false) {
    localStorage.removeItem(k(key, shared));
    return { key, deleted: true, shared };
  },
  async list(prefix = "", shared = false) {
    const p = k(prefix, shared);
    const keys = Object.keys(localStorage).filter((x) => x.startsWith(p));
    return { keys, prefix, shared };
  },
};
