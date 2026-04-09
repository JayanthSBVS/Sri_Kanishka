/**
 * fileLock.util.js
 * A simple async mutex to serialize file write operations.
 * Prevents file corruption when multiple requests try to write simultaneously.
 */

class FileLock {
  constructor() {
    /** @type {Map<string, Promise<void>>} */
    this._locks = new Map();
  }

  /**
   * Acquire a lock for a specific file path, run the async operation,
   * then release so the next queued operation can proceed.
   * @param {string} key - Unique key (usually file path)
   * @param {() => Promise<T>} fn - Async function to run exclusively
   * @returns {Promise<T>}
   */
  async run(key, fn) {
    const previous = this._locks.get(key) ?? Promise.resolve();
    let releaseLock;
    const next = new Promise((resolve) => { releaseLock = resolve; });
    this._locks.set(key, next);

    await previous;
    try {
      return await fn();
    } finally {
      releaseLock();
      // Clean up the map if this was the last operation
      if (this._locks.get(key) === next) {
        this._locks.delete(key);
      }
    }
  }
}

// Singleton — shared across all repositories
module.exports = new FileLock();
