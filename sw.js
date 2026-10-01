// Change this version whenever a deployed game file changes.
const CACHE = 'shrike-tycoon-0.8.4.12-pwa1';
const ASSETS = [
  "./",
  "./styles.css",
  "./manifest.webmanifest",
  "./LICENSES.txt",
  "./index.html",
  "./dist/game.js",
  "./assets/icon-192.png",
  "./assets/cover.png",
  "./assets/icon-512.png",
  "./assets/fonts/NotoEmoji.ttf",
  "./assets/fonts/Jua-Regular.ttf",
  "./assets/pixel/southern-fiscal.png",
  "./assets/pixel/eastern-cattle-egret.png",
  "./assets/pixel/grey-heron.png",
  "./assets/pixel/common-blackbird.png",
  "./assets/pixel/cape-wagtail.png",
  "./assets/pixel/grey-wagtail.png",
  "./assets/pixel/world3.png",
  "./assets/pixel/european-bee-eater.png",
  "./assets/pixel/red-billed-chough.png",
  "./assets/pixel/sao-tome-fiscal.png",
  "./assets/pixel/cape-crow.png",
  "./assets/pixel/blue-whistling-thrush.png",
  "./assets/pixel/eastern-bluebird.png",
  "./assets/pixel/chef-bull-headed.png",
  "./assets/pixel/world5.png",
  "./assets/pixel/american-robin.png",
  "./assets/pixel/slaty-backed-gull.png",
  "./assets/pixel/common-kingfisher.png",
  "./assets/pixel/northern-mockingbird.png",
  "./assets/pixel/european-nightjar.png",
  "./assets/pixel/chef-isabelline.png",
  "./assets/pixel/red-backed-shrike.png",
  "./assets/pixel/belted-kingfisher.png",
  "./assets/pixel/daurian-redstart.png",
  "./assets/pixel/world1.png",
  "./assets/pixel/himalayan-woodpecker.png",
  "./assets/pixel/short-tailed-albatross.png",
  "./assets/pixel/brown-hawk-owl.png",
  "./assets/pixel/northern-fiscal.png",
  "./assets/pixel/brown-eared-bulbul.png",
  "./assets/pixel/african-grey-hornbill.png",
  "./assets/pixel/loggerhead-shrike.png",
  "./assets/pixel/madagascar-kestrel.png",
  "./assets/pixel/little-grebe.png",
  "./assets/pixel/chef-northern.png",
  "./assets/pixel/japanese-tit.png",
  "./assets/pixel/beijing-babbler.png",
  "./assets/pixel/chef-great-grey.png",
  "./assets/pixel/oriental-scops-owl.png",
  "./assets/pixel/green-backed-tit.png",
  "./assets/pixel/chef-chinese-grey.png",
  "./assets/pixel/great-spotted-woodpecker.png",
  "./assets/pixel/japanese-accentor.png",
  "./assets/pixel/lilac-breasted-roller.png",
  "./assets/pixel/himalayan-bulbul.png",
  "./assets/pixel/eurasian-hoopoe.png",
  "./assets/pixel/superb-starling.png",
  "./assets/pixel/sao-tome-thrush.png",
  "./assets/pixel/steppe-eagle.png",
  "./assets/pixel/common-kestrel.png",
  "./assets/pixel/european-robin.png",
  "./assets/pixel/madagascar-kingfisher.png",
  "./assets/pixel/american-kestrel.png",
  "./assets/pixel/karoo-scrub-robin.png",
  "./assets/pixel/chef-brown.png",
  "./assets/pixel/isabelline-shrike.png",
  "./assets/pixel/mackinnons-shrike.png",
  "./assets/pixel/japanese-grosbeak.png",
  "./assets/pixel/red-tailed-shrike.png",
  "./assets/pixel/black-crowned-night-heron.png",
  "./assets/pixel/eurasian-treecreeper.png",
  "./assets/pixel/marsh-tit.png",
  "./assets/pixel/grey-backed-shrike.png",
  "./assets/pixel/coal-tit.png",
  "./assets/pixel/oriental-magpie.png",
  "./assets/pixel/chef-tiger.png",
  "./assets/pixel/grey-headed-lapwing.png",
  "./assets/pixel/ruddy-kingfisher.png",
  "./assets/pixel/isabelline-wheatear.png",
  "./assets/pixel/palm-cockatoo.png",
  "./assets/pixel/sao-tome-oriole.png",
  "./assets/pixel/white-capped-redstart.png",
  "./assets/pixel/rufous-sibia.png",
  "./assets/pixel/barn-swallow.png",
  "./assets/pixel/eurasian-jay.png",
  "./assets/pixel/world8.png",
  "./assets/pixel/european-roller.png",
  "./assets/pixel/madagascar-magpie-robin.png",
  "./assets/pixel/world7.png",
  "./assets/pixel/lesser-grey-shrike.png",
  "./assets/pixel/world10.png",
  "./assets/pixel/world2.png",
  "./assets/pixel/black-grouse.png",
  "./assets/pixel/eurasian-sparrowhawk.png",
  "./assets/pixel/little-egret.png",
  "./assets/pixel/yellow-bittern.png",
  "./assets/pixel/world4.png",
  "./assets/pixel/world6.png",
  "./assets/pixel/little-owl.png",
  "./assets/pixel/common-sandpiper.png",
  "./assets/pixel/oriental-reed-warbler.png",
  "./assets/pixel/pale-thrush.png",
  "./assets/pixel/white-wagtail.png",
  "./assets/pixel/japanese-pygmy-woodpecker.png",
  "./assets/pixel/cape-robin-chat.png",
  "./assets/pixel/fiscal-flycatcher.png",
  "./assets/pixel/world9.png",
  "./assets/pixel/plumbeous-water-redstart.png",
  "./assets/pixel/chef-red-backed.png",
  "./assets/pixel/african-pygmy-kingfisher.png",
  "./assets/pixel/chef-red-tailed.png",
  "./assets/pixel/grey-nightjar.png",
  "./assets/pixel/eurasian-nuthatch.png",
  "./assets/pixel/chef-long-tailed.png",
  "./assets/pixel/chef-grey-backed.png",
  "./assets/pixel/varied-tit.png",
  "./assets/pixel/whites-thrush.png",
  "./assets/audio/mosu_kushiyaki_shop.mp3",
  "./pwa.js"
];
// Complete each version before activation. Do not interrupt an open game.
self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(async cache => {
    try {
      for (let i = 0; i < ASSETS.length; i += 6) {
        await cache.addAll(ASSETS.slice(i, i + 6).map(url => new Request(url, {cache: 'reload'})));
      }
    } catch (error) {
      await caches.delete(CACHE);
      throw error;
    }
  }));
});
self.addEventListener('activate', event => {
  event.waitUntil(caches.keys().then(keys => Promise.all(
    keys.filter(key => key !== CACHE && key.startsWith('shrike-tycoon-')).map(key => caches.delete(key))
  )).then(() => self.clients.claim()));
});

async function cachedRange(request, response) {
  const match = /^bytes=(\d*)-(\d*)$/.exec(request.headers.get('range') || '');
  if (!match || (!match[1] && !match[2])) return fetch(request);
  const bytes = await response.arrayBuffer();
  const size = bytes.byteLength;
  const start = match[1] ? Number(match[1]) : Math.max(0, size - Number(match[2]));
  const end = match[1] && match[2] ? Math.min(Number(match[2]), size - 1) : size - 1;
  if (start > end || start >= size) {
    return new Response(null, {status: 416, headers: {'Content-Range': `bytes */${size}`}});
  }
  const headers = new Headers(response.headers);
  headers.set('Content-Range', `bytes ${start}-${end}/${size}`);
  headers.set('Content-Length', String(end - start + 1));
  headers.set('Accept-Ranges', 'bytes');
  return new Response(bytes.slice(start, end + 1), {status: 206, headers});
}

self.addEventListener('fetch', event => {
  const request = event.request;
  const url = new URL(request.url);
  if (request.method !== 'GET' || url.origin !== self.location.origin ||
      !url.href.startsWith(self.registration.scope)) return;
  event.respondWith((async () => {
    const cache = await caches.open(CACHE);
    // Treat home-screen launches with query strings as the same game shell.
    const response = request.mode === 'navigate'
      ? await cache.match('./index.html')
      : await cache.match(request);
    if (response) return request.headers.has('range') ? cachedRange(request, response) : response;
    // Never substitute HTML for a missing image, script or audio resource.
    return fetch(request);
  })());
});
