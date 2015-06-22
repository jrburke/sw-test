this.addEventListener('install', function(event) {

console.log('IN SW: install');
  event.waitUntil(
    caches.open('v1').then(function(cache) {
console.log('IN THE CACHE OPEN');
      return cache.addAll([
        '/sw-test-jrburke/',
        '/sw-test-jrburke/index.html',
        '/sw-test-jrburke/style.css',
        '/sw-test-jrburke/app.js',
        '/sw-test-jrburke/shared-worker.js',
        '/sw-test-jrburke/image-list.js',
        '/sw-test-jrburke/star-wars-logo.jpg',
        '/sw-test-jrburke/gallery/',
        '/sw-test-jrburke/gallery/bountyHunters.jpg',
        '/sw-test-jrburke/gallery/myLittleVader.jpg',
        '/sw-test-jrburke/gallery/snowTroopers.jpg'
      ]);
    }).then(function(ok) {
      console.log('CACHE SUCCESS: ' + ok);
      return ok;
    }, function(err) {
      console.log('CACHED FAILED: ' + err);
      return err;
    })
  );
});

this.addEventListener('fetch', function(event) {
console.log('IN SW: fetch: ' + event.request.url);
  var response;
  var cachedResponse = caches.match(event.request).catch(function() {
    return fetch(event.request);
  }).then(function(response) {
    caches.open('v1').then(function(cache) {
      cache.put(event.request, response);
    });
    return response.clone();
  }).catch(function() {
    return caches.match('/sw-test-jrburke/gallery/myLittleVader.jpg');
  });
});