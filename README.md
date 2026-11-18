# Cottonwood Creek Community Association

Public community website for Cottonwood Creek in Richardson, Texas, built with the Clubhouse Links visual style.

## Website

Expected GitHub Pages URL once Pages is enabled:

https://evanalmighty84.github.io/CottonwoodCreekCommunity/

In GitHub, open **Settings → Pages → Build and deployment → Deploy from a branch** and select **main** / **(root)**, then Save. GitHub Pages might take several minutes to publish.

The website is static and works without an app build step. The homepage, responsive CSS, and public content loader are in `index.html`.

## Clubhouse Links backend integration

The website requests **public, published-only** content from:

`https://crm-function-app-5d4de511071d.herokuapp.com/server/resident_function/api/community-sites/cottonwood-creek`

This API endpoint is **not automatically installed** by publishing the site. Until it is implemented, the homepage displays a clear content-unavailable message instead of mock news or invented event details.

A future API response should resemble:

```json
{
  "site": {"hero_text": "Welcome", "about_text": "About our community", "contact_url": "https://clubhouselinks.com"},
  "announcements": [{"title": "Community update", "description": "Details", "published_at": "2026-11-17T00:00:00Z"}],
  "events": [{"title": "Neighborhood gathering", "description": "Details", "address": "Richardson, Texas", "starts_at": "2026-12-01T17:00:00Z"}],
  "resources": [{"label": "Community resources", "url": "https://example.org"}]
}
```

**Do not add credentials to this public GitHub Pages repository.** Authenticate HOA board editing only in the Clubhouse Links backend, using a verified login token and a server-side check that the user belongs to Cottonwood Creek and is an approved board director. Never trust a resident ID sent by the website as authorization.

Board editing, database migration, event schema verification, and backend API deployment are separate work and are **not yet live**.

## Original design

Derived as a separate community concept from the WSD.Clubhouse design direction; the WSD site remains unchanged.
