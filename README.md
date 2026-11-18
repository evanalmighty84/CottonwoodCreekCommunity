# Cottonwood Creek Community Association

Public community website for Cottonwood Creek in Richardson, Texas, built with the Clubhouse Links visual style.

## Website

Expected GitHub Pages URL once Pages is enabled:

https://evanalmighty84.github.io/CottonwoodCreekCommunity/

In GitHub, open **Settings → Pages → Build and deployment → Deploy from a branch** and select **main** / **(root)**, then Save. GitHub Pages might take several minutes to publish.

The website is static and works without an app build step. The homepage, responsive CSS, and public content loader are in `index.html`.

## Clubhouse Links backend integration

The website requests **public, published-only** content from:

`https://crm-function-app-5d4de511071d.herokuapp.com/server/resident_function/api/residents/community-sites/cottonwood-creek`

The Clubhouse Links backend repository now contains the read-only
`getCottonwoodCreekPublicContent` controller and route.

The website uses the returned content as follows:

- **Community news** → published HOA announcements for the matched neighborhood.
- **Neighborhood events** → published `hoa_events` rows (including event photos).
- **Helpful resources / Community vendors** → active `hoa_vendors` rows
  (vendor names, categories, descriptions, logos, and public websites).

The homepage tiles scroll to their respective live lists. The public website
does not authenticate as a resident, does not publish drafts, and does not
provide board editing functionality.

**Deployment checks:** confirm the backend controller and route are deployed on
Heroku, that browser CORS is allowed for the GitHub Pages origin, and that the
`hoa_neighborhoods` record maps uniquely to Cottonwood Creek. The controller
deliberately returns 404/409 rather than guessing another neighborhood ID.
The endpoint was not verified live during the website edit.

No credentials belong in this public GitHub Pages repository. Board publishing
remains restricted to authenticated Clubhouse Links interfaces.

## Original design

Derived as a separate community concept from the WSD.Clubhouse design direction; the WSD site remains unchanged.
