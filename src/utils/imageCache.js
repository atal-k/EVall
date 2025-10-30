// src/utils/imageCache.js
/**
 * Lightweight image loader + cache with concurrency control.
 * Exports:
 *   preload(src) -> Promise<HTMLImageElement>
 *   isLoaded(src) -> boolean
 *
 * Implementation notes:
 * - Keeps a Map of src -> Promise for deduplication.
 * - Uses a small concurrency queue to avoid creating too many parallel Image() requests.
 */

const MAX_CONCURRENCY = 4; // tweak for environment
const cache = new Map(); // src -> { status, promise, img }

let activeCount = 0;
const queue = []; // array of { src, resolve, reject }

function _loadImageNow(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    // allow crossOrigin when images are remote and CORS headers are set
    img.crossOrigin = "anonymous";
    img.onload = () => {
      resolve(img);
    };
    img.onerror = (err) => {
      reject(new Error("Failed to load image: " + src));
    };
    img.src = src;
  });
}

function _dequeue() {
  if (activeCount >= MAX_CONCURRENCY) return;
  if (queue.length === 0) return;
  const item = queue.shift();
  activeCount++;
  _loadImageNow(item.src)
    .then((img) => {
      cache.set(item.src, { status: "loaded", promise: Promise.resolve(img), img });
      item.resolve(img);
    })
    .catch((err) => {
      cache.set(item.src, { status: "error", promise: Promise.reject(err), img: null });
      item.reject(err);
    })
    .finally(() => {
      activeCount--;
      // next tick to avoid deeply nested calls
      setTimeout(_dequeue, 0);
    });
}

/**
 * Preload an image, with concurrency and caching.
 * Returns a Promise that resolves with the HTMLImageElement.
 */
export function preload(src) {
  if (!src) return Promise.reject(new Error("No src provided"));
  const existing = cache.get(src);
  if (existing) {
    // return the existing stored promise (loaded or loading)
    if (existing.promise) return existing.promise;
  }
  const p = new Promise((resolve, reject) => {
    queue.push({ src, resolve, reject });
    // store a placeholder promise in cache (so repeated calls don't queue duplicates)
    cache.set(src, { status: "loading", promise: p, img: null });
    // kick the queue processor
    setTimeout(_dequeue, 0);
  });
  // keep the cache promise reference (already set above)
  return p;
}

/** Synchronous check whether an image is loaded in cache. */
export function isLoaded(src) {
  const ent = cache.get(src);
  return !!(ent && ent.status === "loaded" && ent.img);
}
