
'use strict';
const API_ORIGIN = window.COTTONWOOD_API_ORIGIN || 'https://crm-function-app-5d4de511071d.herokuapp.com';
const API_PATH = '/server/resident_function/api/community-sites/cottonwood-creek';
const $ = (s) => document.querySelector(s);
const escapeHtml = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = (v) => {
  try {
    const u = new URL(v);
    return ['https:', 'mailto:'].includes(u.protocol) ? u.href : null;
  } catch {
    return null;
  }
};
function renderCard(item, type) {
  const stampValue = item.starts_at || item.published_at || item.updated_at;
  const stamp = stampValue ? new Date(stampValue).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : '';
  const link = safeUrl(item.url);
  return `<article>
    <span class="meta">${type} ${escapeHtml(stamp)}</span>
    <h3>${escapeHtml(item.title || '')}</h3>
    <p>${escapeHtml(item.description || '')}</p>
    ${item.address ? `<p><strong>Location:</strong> ${escapeHtml(item.address)}</p>` : ''}
    ${link ? `<p><a class="button ghost" href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">Learn more</a></p>` : ''}
  </article>`;
}
function renderResources(items) {
  if (!items.length) return '<p class="muted">No resources published yet.</p>';
  return items.map((item) => {
    const link = safeUrl(item.url);
    const inner = `<strong>${escapeHtml(item.label || item.title || 'Resource')}</strong><p>${escapeHtml(item.description || '')}</p>`;
    return link ? `<a href="${escapeHtml(link)}" target="_blank" rel="noopener noreferrer">${inner}</a>` : `<div class="error-callout">${inner}</div>`;
  }).join('');
}
function applyContent(data) {
  const site = data.site || {};
  if (site.hero_text) $('#hero-copy').textContent = site.hero_text;
  if (site.about_text) $('#about-copy').textContent = site.about_text;
  if (site.contact_url && safeUrl(site.contact_url)) $('#contact-link').href = safeUrl(site.contact_url);
  const announcements = Array.isArray(data.announcements) ? data.announcements : [];
  const events = Array.isArray(data.events) ? data.events : [];
  const resources = Array.isArray(data.resources) ? data.resources : [];
  $('#announcements').innerHTML = announcements.length ? announcements.map((x) => renderCard(x, 'Community update')).join('') : '<p class="muted">No announcements published yet.</p>';
  $('#events-list').innerHTML = events.length ? events.map((x) => renderCard(x, 'Event')).join('') : '<p class="muted">No community events published yet.</p>';
  $('#resource-list').innerHTML = renderResources(resources);
}
function setFallback() {
  $('#announcements').innerHTML = '<div class="error-callout"><strong>Community updates will appear here.</strong><p>This public site is ready for live content once the Clubhouse Links board publishing endpoint is connected.</p></div>';
  $('#events-list').innerHTML = '<div class="error-callout"><strong>Event publishing will appear here.</strong><p>Board-managed neighborhood events will show once the public read-only feed is available.</p></div>';
  $('#resource-list').innerHTML = '<div class="error-callout"><strong>Resources will appear here.</strong><p>Community links and documents can be published from the Clubhouse Links backend.</p></div>';
}
document.addEventListener('DOMContentLoaded', async () => {
  $('#year').textContent = String(new Date().getFullYear());
  const menu = $('#menu');
  const links = $('#links');
  menu.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(open));
  });
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 9000);
    const response = await fetch(API_ORIGIN + API_PATH, { headers: { Accept: 'application/json' }, signal: controller.signal });
    clearTimeout(timeout);
    if (!response.ok) throw new Error('Request failed');
    const data = await response.json();
    applyContent(data);
  } catch (err) {
    setFallback();
  }
});
