// ABC Adventure offline support: the game and its art are cached after the first visit.
const V='abc-eb4935c207',CORE=["/abc/", "/abc/art-1.json", "/abc/art-2.json", "/abc/manifest.webmanifest", "/assets/fonts/fredoka.woff2", "/assets/fonts/nunito.woff2", "/assets/fonts/andika.woff2", "/favicon.svg", "/icon-192.png"];
self.addEventListener('install',e=>e.waitUntil(caches.open(V).then(c=>c.addAll(CORE)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==V).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request,u=new URL(r.url);if(r.method!=='GET'||u.origin!==location.origin)return;
 if(r.mode==='navigate'){e.respondWith(fetch(r).then(res=>{if(res.ok&&u.pathname.startsWith('/abc/')){const c=res.clone();caches.open(V).then(x=>x.put('/abc/',c))}return res}).catch(()=>caches.match('/abc/')));return}
 e.respondWith(caches.match(r).then(m=>m||fetch(r).then(res=>{if(res.ok){const c=res.clone();caches.open(V).then(x=>x.put(r,c))}return res})))});
