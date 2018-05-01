import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const _138b7163 = () => import('..\\pages\\zacznij-tutaj.vue' /* webpackChunkName: "pages_zacznij-tutaj" */).then(m => m.default || m)
const _56d317a0 = () => import('..\\pages\\admin\\index.vue' /* webpackChunkName: "pages_admin_index" */).then(m => m.default || m)
const _3592d430 = () => import('..\\pages\\o-mnie.vue' /* webpackChunkName: "pages_o-mnie" */).then(m => m.default || m)
const _54164ca9 = () => import('..\\pages\\archiwum.vue' /* webpackChunkName: "pages_archiwum" */).then(m => m.default || m)
const _4f88ca80 = () => import('..\\pages\\admin\\dodaj.vue' /* webpackChunkName: "pages_admin_dodaj" */).then(m => m.default || m)
const _e247097e = () => import('..\\pages\\admin\\edytuj\\index.vue' /* webpackChunkName: "pages_admin_edytuj_index" */).then(m => m.default || m)
const _7357dac3 = () => import('..\\pages\\admin\\kontent\\index.vue' /* webpackChunkName: "pages_admin_kontent_index" */).then(m => m.default || m)
const _3c054877 = () => import('..\\pages\\admin\\zapisane.vue' /* webpackChunkName: "pages_admin_zapisane" */).then(m => m.default || m)
const _2a4393f0 = () => import('..\\pages\\admin\\zaloguj.vue' /* webpackChunkName: "pages_admin_zaloguj" */).then(m => m.default || m)
const _2f345030 = () => import('..\\pages\\admin\\ustawienia.vue' /* webpackChunkName: "pages_admin_ustawienia" */).then(m => m.default || m)
const _656fb6c5 = () => import('..\\pages\\admin\\kategorie\\index.vue' /* webpackChunkName: "pages_admin_kategorie_index" */).then(m => m.default || m)
const _6bc9d051 = () => import('..\\pages\\admin\\utworz.vue' /* webpackChunkName: "pages_admin_utworz" */).then(m => m.default || m)
const _3f3be5d6 = () => import('..\\pages\\admin\\kategorie\\dodaj.vue' /* webpackChunkName: "pages_admin_kategorie_dodaj" */).then(m => m.default || m)
const _49b9722c = () => import('..\\pages\\admin\\kategorie\\edytuj.vue' /* webpackChunkName: "pages_admin_kategorie_edytuj" */).then(m => m.default || m)
const _f64f596c = () => import('..\\pages\\admin\\kontent\\zacznijtutaj.vue' /* webpackChunkName: "pages_admin_kontent_zacznijtutaj" */).then(m => m.default || m)
const _c8518746 = () => import('..\\pages\\admin\\kontent\\omnie.vue' /* webpackChunkName: "pages_admin_kontent_omnie" */).then(m => m.default || m)
const _5516572c = () => import('..\\pages\\admin\\kontent\\opis.vue' /* webpackChunkName: "pages_admin_kontent_opis" */).then(m => m.default || m)
const _89e7a6c2 = () => import('..\\pages\\admin\\zapisanypost\\_id.vue' /* webpackChunkName: "pages_admin_zapisanypost__id" */).then(m => m.default || m)
const _5e2259e9 = () => import('..\\pages\\admin\\edytuj\\_id.vue' /* webpackChunkName: "pages_admin_edytuj__id" */).then(m => m.default || m)
const _63b9157d = () => import('..\\pages\\admin\\kategorie\\_slug.vue' /* webpackChunkName: "pages_admin_kategorie__slug" */).then(m => m.default || m)
const _e1511200 = () => import('..\\pages\\strona\\_page.vue' /* webpackChunkName: "pages_strona__page" */).then(m => m.default || m)
const _e34a1bf4 = () => import('..\\pages\\kategoria\\_slug\\index.vue' /* webpackChunkName: "pages_kategoria__slug_index" */).then(m => m.default || m)
const _3bed981e = () => import('..\\pages\\kategoria\\_slug\\strona\\_page.vue' /* webpackChunkName: "pages_kategoria__slug_strona__page" */).then(m => m.default || m)
const _2c88b415 = () => import('..\\pages\\index.vue' /* webpackChunkName: "pages_index" */).then(m => m.default || m)
const _2ad212cd = () => import('..\\pages\\_slug.vue' /* webpackChunkName: "pages__slug" */).then(m => m.default || m)



if (process.client) {
  window.history.scrollRestoration = 'manual'
}
const scrollBehavior = function (to, from, savedPosition) {
  // if the returned position is falsy or an empty object,
  // will retain current scroll position.
  let position = false

  // if no children detected
  if (to.matched.length < 2) {
    // scroll to the top of the page
    position = { x: 0, y: 0 }
  } else if (to.matched.some((r) => r.components.default.options.scrollToTop)) {
    // if one of the children has scrollToTop option set to true
    position = { x: 0, y: 0 }
  }

  // savedPosition is only available for popstate navigations (back button)
  if (savedPosition) {
    position = savedPosition
  }

  return new Promise(resolve => {
    // wait for the out transition to complete (if necessary)
    window.$nuxt.$once('triggerScroll', () => {
      // coords will be used if no selector is provided,
      // or if the selector didn't match any element.
      if (to.hash) {
        let hash = to.hash
        // CSS.escape() is not supported with IE and Edge.
        if (typeof window.CSS !== 'undefined' && typeof window.CSS.escape !== 'undefined') {
          hash = '#' + window.CSS.escape(hash.substr(1))
        }
        try {
          if (document.querySelector(hash)) {
            // scroll to anchor by returning the selector
            position = { selector: hash }
          }
        } catch (e) {
          console.warn('Failed to save scroll position. Please add CSS.escape() polyfill (https://github.com/mathiasbynens/CSS.escape).')
        }
      }
      resolve(position)
    })
  })
}


export function createRouter () {
  return new Router({
    mode: 'history',
    base: '/',
    linkActiveClass: 'nuxt-link-active',
    linkExactActiveClass: 'nuxt-link-exact-active',
    scrollBehavior,
    routes: [
		{
			path: "/zacznij-tutaj",
			component: _138b7163,
			name: "zacznij-tutaj"
		},
		{
			path: "/admin",
			component: _56d317a0,
			name: "admin"
		},
		{
			path: "/o-mnie",
			component: _3592d430,
			name: "o-mnie"
		},
		{
			path: "/archiwum",
			component: _54164ca9,
			name: "archiwum"
		},
		{
			path: "/admin/dodaj",
			component: _4f88ca80,
			name: "admin-dodaj"
		},
		{
			path: "/admin/edytuj",
			component: _e247097e,
			name: "admin-edytuj"
		},
		{
			path: "/admin/kontent",
			component: _7357dac3,
			name: "admin-kontent"
		},
		{
			path: "/admin/zapisane",
			component: _3c054877,
			name: "admin-zapisane"
		},
		{
			path: "/admin/zaloguj",
			component: _2a4393f0,
			name: "admin-zaloguj"
		},
		{
			path: "/admin/ustawienia",
			component: _2f345030,
			name: "admin-ustawienia"
		},
		{
			path: "/admin/kategorie",
			component: _656fb6c5,
			name: "admin-kategorie"
		},
		{
			path: "/admin/utworz",
			component: _6bc9d051,
			name: "admin-utworz"
		},
		{
			path: "/admin/kategorie/dodaj",
			component: _3f3be5d6,
			name: "admin-kategorie-dodaj"
		},
		{
			path: "/admin/kategorie/edytuj",
			component: _49b9722c,
			name: "admin-kategorie-edytuj"
		},
		{
			path: "/admin/kontent/zacznijtutaj",
			component: _f64f596c,
			name: "admin-kontent-zacznijtutaj"
		},
		{
			path: "/admin/kontent/omnie",
			component: _c8518746,
			name: "admin-kontent-omnie"
		},
		{
			path: "/admin/kontent/opis",
			component: _5516572c,
			name: "admin-kontent-opis"
		},
		{
			path: "/admin/zapisanypost/:id?",
			component: _89e7a6c2,
			name: "admin-zapisanypost-id"
		},
		{
			path: "/admin/edytuj/:id",
			component: _5e2259e9,
			name: "admin-edytuj-id"
		},
		{
			path: "/admin/kategorie/:slug",
			component: _63b9157d,
			name: "admin-kategorie-slug"
		},
		{
			path: "/strona/:page?",
			component: _e1511200,
			name: "strona-page"
		},
		{
			path: "/kategoria/:slug?",
			component: _e34a1bf4,
			name: "kategoria-slug"
		},
		{
			path: "/kategoria/:slug?/strona/:page?",
			component: _3bed981e,
			name: "kategoria-slug-strona-page"
		},
		{
			path: "/",
			component: _2c88b415,
			name: "index"
		},
		{
			path: "/:slug",
			component: _2ad212cd,
			name: "slug"
		}
    ],
    
    
    fallback: false
  })
}
