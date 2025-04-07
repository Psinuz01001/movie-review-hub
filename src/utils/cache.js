const cache = new Map();

export function getCachedMovie(id) {
  return cache.get(id);
}

export function cacheMovie(id, data) {
  cache.set(id, data);
}

export function preloadMovieDetails(id, fetchFunction) {
  if (!cache.has(id)) {
    fetchFunction(id).then(data => {
      cache.set(id, data);
    });
  }
}
