// Lightweight storage shim so the code that was written for Claude's
// artifact `window.storage` API also works as a real, deployed website.
//
// IMPORTANT LIMITATION:
// This uses the browser's localStorage, which is PER BROWSER / PER DEVICE.
// - Personal data (account, favorites, purchases) works great this way.
// - "Shared" data (the admin's book/anime list, comments) will only be
//   visible on the SAME browser that added it. Other visitors will just
//   see the original seed data, not the admin's edits.
//
// To make admin edits and comments visible to ALL visitors, replace this
// file with real calls to a backend database (e.g. Supabase, Firebase,
// or your own API). Everywhere else in the app stays the same.

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
