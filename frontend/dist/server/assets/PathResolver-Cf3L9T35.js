import { jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect, Suspense, lazy } from "react";
import { d as useRoute, b as useTaxonomies, u as useAuth } from "./TimeContext-BxmeFsde.js";
import { useParams } from "react-router";
import { g as getArticleBySlug } from "./article.service-95iQKjGd.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "axios";
const HomeTemplate = lazy(() => import("./Trending-a66RxQeP.js").then((n) => n.e));
const Single = lazy(() => import("./Single-CnaaAtMk.js"));
const Deals = lazy(() => import("./Deals-1VonFoEN.js"));
const JobListing = lazy(() => import("./JobListing-DVEKM5-j.js"));
const Directory = lazy(() => import("./Directory-DSnRfTGu.js"));
const Events = lazy(() => import("./Events-B4GhgbF0.js"));
const SingleJob = lazy(() => import("./SingleJob-BwN4FwNP.js"));
const SingleEvent = lazy(() => import("./SingleEvent-Cm5Q9N9k.js"));
const NotFound = lazy(() => import("./NotFound-CXV6LCNo.js"));
const Housing = lazy(() => import("./Housing-CZ4Mikme.js"));
const Search = lazy(() => import("./Search-9LwSTWf-.js"));
const Overseas = lazy(() => import("./Overseas-n0_Uie33.js"));
const parseParams = (slugs, tax) => {
  const p = { country: void 0, city: void 0, region: void 0, category: void 0 };
  slugs.forEach((s) => {
    var _a, _b, _c, _d;
    const c = (_a = tax.countries) == null ? void 0 : _a.find((x) => x.slug == s);
    const ct = (_b = tax.cities) == null ? void 0 : _b.find((x) => x.slug == s);
    const r = (_c = tax.regions) == null ? void 0 : _c.find((x) => x.slug == s);
    const cat = (_d = tax.categories) == null ? void 0 : _d.find((x) => x.slug_title == s);
    if (c) p.country = c;
    else if (ct) p.city = ct;
    else if (r) p.region = r;
    else if (cat) p.category = cat;
  });
  return p;
};
const resolveRoute = async (path, tax, _userDetails) => {
  var _a, _b, _c, _d, _e;
  const slugs = path ? path.split("/").filter(Boolean) : [];
  if (slugs.length === 0) {
    return { type: "HOME", listingParams: { country: void 0, city: void 0, region: void 0, category: void 0 } };
  }
  const last = slugs[slugs.length - 1];
  const art = await getArticleBySlug(last);
  if (art) {
    const cat = (_a = tax.categories) == null ? void 0 : _a.find((x) => x.id == art.category_id);
    const listing2 = parseParams(slugs.slice(0, -1), tax);
    if ((cat == null ? void 0 : cat.slug_title) === "job-listing") {
      return { type: "ARTICLE_JOB", listingParams: { ...listing2, article: art }, articleSlug: last };
    }
    if ((cat == null ? void 0 : cat.slug_title) === "events") {
      return { type: "ARTICLE_EVENT", listingParams: { ...listing2, article: art }, articleSlug: last };
    }
    return { type: "ARTICLE_PAGE", listingParams: { ...listing2, article: art }, articleSlug: last };
  }
  const listing = parseParams(slugs, tax);
  const lp = { ...listing, article: void 0 };
  if (last === "trending") return { type: "LISTING_TRENDINGS", listingParams: lp };
  if (last === "overseas") return { type: "LISTING_OVERSEAS", listingParams: lp };
  if (last === "search") return { type: "LISTING_SEARCH", listingParams: lp };
  if (((_b = listing.category) == null ? void 0 : _b.slug_title) === "events") return { type: "LISTING_EVENTS", listingParams: lp };
  if (((_c = listing.category) == null ? void 0 : _c.slug_title) === "job-listing") return { type: "LISTING_JOBS", listingParams: lp };
  if (((_d = listing.category) == null ? void 0 : _d.slug_title) === "deals") return { type: "LISTING_DEALS", listingParams: lp };
  if (((_e = listing.category) == null ? void 0 : _e.slug_title) === "housing") return { type: "LISTING_HOUSING", listingParams: lp };
  if (listing.category) return { type: "LISTING_CATEGORIES", listingParams: lp };
  if (!listing.country && !listing.city && !listing.region && !listing.category) return { type: "NOT_FOUND", listingParams: lp };
  return { type: "LISTING_HOME", listingParams: lp };
};
const PathResolver = () => {
  var _a;
  const { routeType, setRouteType, setActualRoute, actualRoute, setClientChange, clientChange } = useRoute();
  const [renderState, setRenderState] = useState({ type: routeType, listingParams: actualRoute });
  const [firstRender, setFirstRender] = useState(true);
  const prevParams = useRef(null);
  const params = useParams();
  const path = params["*"];
  const { taxonomies } = useTaxonomies();
  const { userDetails } = useAuth();
  useEffect(() => {
    prevParams.current = params;
  }, []);
  useEffect(() => {
    if (prevParams.current["*"] !== params["*"]) {
      prevParams.current = params;
      setFirstRender(false);
    }
  }, [params]);
  useEffect(() => {
    if (firstRender) return;
    setClientChange(true);
  }, [firstRender]);
  useEffect(() => {
    if (!clientChange) return;
    (async () => {
      const r = await resolveRoute(path ?? "", taxonomies);
      setRenderState(r);
      setRouteType(r.type);
      setActualRoute(r.listingParams);
    })();
  }, [clientChange, params]);
  switch (routeType) {
    case "ARTICLE_JOB":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(JobListing, { children: /* @__PURE__ */ jsx(SingleJob, {}) }, "single-job") });
    case "ARTICLE_EVENT":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(SingleEvent, {}, "single-event") });
    case "ARTICLE_PAGE":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Single, {}, "single-article") });
    case "LISTING_JOBS":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(JobListing, {}, "job-listing") });
    case "LISTING_SEARCH":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Search, {}, "search") });
    case "LISTING_TRENDINGS":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Directory, { isTrending: true }, "trending") });
    case "LISTING_OVERSEAS":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Overseas, {}, "overseas") });
    case "LISTING_EVENTS":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Events, {}, "events") });
    case "LISTING_DEALS":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Deals, {}, "deals") });
    case "LISTING_CATEGORIES":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Directory, {}, `cat-${(_a = renderState.listingParams.category) == null ? void 0 : _a.slug_title}`) });
    case "LISTING_HOUSING":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(Housing, {}, "housing") });
    case "LISTING_HOME":
    case "HOME":
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(HomeTemplate, {}, "home") });
    case "LOADING":
      return null;
    default:
      return /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(NotFound, {}) });
  }
};
export {
  PathResolver as default
};
