// Vỏ app cũ ở thư mục gốc đã ngừng dùng (Sổ Thu Chi chuyển sang chi/).
// Service worker này chỉ dọn bộ đệm cũ rồi tự gỡ, để không chiếm trang của Sổ Thú Cưng nữa.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k === 'sothuchi-shell-v1' || k === 'sothuchi-shell-v2').map(k => caches.delete(k)));
    await self.registration.unregister();
    const list = await self.clients.matchAll({ type: 'window' });
    list.forEach(c => { try { c.navigate(c.url); } catch (e) {} });
  })());
});
