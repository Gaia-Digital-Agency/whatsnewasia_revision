import { jsx, Fragment } from "react/jsx-runtime";
import { PassThrough } from "stream";
import { renderToPipeableStream } from "react-dom/server";
import { useNavigate, useParams, createMemoryRouter, RouterProvider } from "react-router";
import { u as useAuth, b as useTaxonomies, g as getDataDetailUser, T as TimeProvider, a as TaxonomyProvider, R as RouteProvider, C as ContentProvider, H as HeaderContentProvider, A as AuthProvider, p as pkg } from "./assets/TimeContext-kZ4zssxE.js";
import { useState, useEffect, lazy, Suspense } from "react";
import { u as useNotification } from "./assets/NotificationContext-BSzMliXN.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "axios";
const ProtectedRoute = ({ children, allowedUserLevel = ["super_admin", "admin_country", "admin_city"] }) => {
  const { userDetails, setUserDetails } = useAuth();
  const { setAdminTaxonomies, taxonomies } = useTaxonomies();
  const [forbiddenLevel, setForbiddenLevel] = useState(false);
  const { setNotification } = useNotification();
  const navigate = useNavigate();
  const getUser = async () => {
    const user = await getDataDetailUser();
    if (user) {
      if (user.status_code == 200 && user.data.length) {
        setUserDetails(user.data[0]);
        return true;
      } else {
        setUserDetails(void 0);
        return false;
      }
    } else {
      setUserDetails(void 0);
      return false;
    }
  };
  const determineTaxonomy = () => {
    var _a, _b, _c, _d, _e, _f, _g, _h, _i;
    if (!taxonomies) return;
    const USER_COUNTRY_ID = (userDetails == null ? void 0 : userDetails.id_country) ?? 1;
    const USER_CITY_ID = (userDetails == null ? void 0 : userDetails.id_city) ?? 1;
    const USER_REGION_ID = (userDetails == null ? void 0 : userDetails.id_region) ?? 1;
    const prev = taxonomies;
    if ((userDetails == null ? void 0 : userDetails.user_level) == "super_admin") {
      setAdminTaxonomies(taxonomies);
      return;
    } else if ((userDetails == null ? void 0 : userDetails.user_level) == "admin_country") {
      const newCountry = (_a = prev.countries) == null ? void 0 : _a.filter((coun) => coun.id == USER_COUNTRY_ID);
      const newCity = (_b = prev.cities) == null ? void 0 : _b.filter((cit) => cit.id_parent == USER_COUNTRY_ID);
      const newRegion = (_c = prev.regions) == null ? void 0 : _c.filter((reg) => {
        return newCity == null ? void 0 : newCity.find((cit) => cit.id == reg.id_parent);
      });
      setAdminTaxonomies({ countries: newCountry, cities: newCity, regions: newRegion });
    } else if ((userDetails == null ? void 0 : userDetails.user_level) == "admin_city") {
      const newCountry = (_d = prev.countries) == null ? void 0 : _d.filter((coun) => coun.id == USER_COUNTRY_ID);
      const newCity = (_e = prev.cities) == null ? void 0 : _e.filter((cit) => cit.id == USER_CITY_ID);
      const newRegion = (_f = prev.regions) == null ? void 0 : _f.filter((reg) => reg.id_parent == USER_CITY_ID);
      setAdminTaxonomies({ countries: newCountry, cities: newCity, regions: newRegion });
    } else if ((userDetails == null ? void 0 : userDetails.user_level) == "admin_region") {
      const newCountry = (_g = prev.countries) == null ? void 0 : _g.filter((coun) => coun.id == USER_COUNTRY_ID);
      const newCity = (_h = prev.cities) == null ? void 0 : _h.filter((cit) => cit.id == USER_CITY_ID);
      const newRegion = (_i = prev.regions) == null ? void 0 : _i.filter((reg) => reg.id == USER_REGION_ID);
      setAdminTaxonomies({ countries: newCountry, cities: newCity, regions: newRegion });
    }
  };
  useEffect(() => {
    if (!forbiddenLevel) return;
    setNotification({ message: "You are not allowed to access the page", type: "fail" });
    navigate("/admin");
    setForbiddenLevel(false);
  }, [forbiddenLevel]);
  const params = useParams();
  useEffect(() => {
    (async () => {
      const user = await getUser();
      if (!user) {
        navigate("/signin");
      }
    })();
  }, [params]);
  useEffect(() => {
    if (userDetails) {
      determineTaxonomy();
    }
  }, [userDetails]);
  if (userDetails === null) {
    return /* @__PURE__ */ jsx(Fragment, {});
  } else {
    if (userDetails === void 0) {
      navigate("/signin");
      return /* @__PURE__ */ jsx(Fragment, {});
    }
    if (userDetails && typeof userDetails.user_level == "string") {
      if (allowedUserLevel.includes(userDetails.user_level)) {
        return /* @__PURE__ */ jsx(Fragment, { children });
      } else {
        setForbiddenLevel(true);
        return /* @__PURE__ */ jsx(Fragment, {});
      }
    }
  }
};
const ArticleAdmin = lazy(() => import("./assets/ArticleAdmin-DiI6Eh1j.js"));
const TemplateLayout = lazy(() => import("./assets/TemplateLayout-CEVD5cPf.js"));
const AppLayout = lazy(() => import("./assets/AppLayout-DWEmTtx6.js"));
const Home = lazy(() => import("./assets/Home-BUcJKWaq.js"));
const SettingPage = lazy(() => import("./assets/SettingPage-CbVUdUEm.js"));
const SocmedSettingPage = lazy(() => import("./assets/SocmedSettingPage-Ct1LJLhm.js"));
const ConfigSMTP = lazy(() => import("./assets/ConfigSMTP-DJu5-dEw.js"));
const MstCategories = lazy(() => import("./assets/MstCategories-DQ1kycoJ.js"));
const MstTags = lazy(() => import("./assets/MstTags-kuhe7-g1.js"));
const MstLocations = lazy(() => import("./assets/MstLocations-DHUe7tl_.js"));
const MstTemplates = lazy(() => import("./assets/MstTemplates-DKI0ZFqH.js"));
const GeneralTemplate = lazy(() => import("./assets/GeneralTemplate-DWmgIGxe.js"));
const AboutTemplate = lazy(() => import("./assets/AboutTemplate-C85V4gaQ.js"));
const LocationTemplateExp = lazy(() => import("./assets/LocationTemplateExp-ELTcC0l_.js"));
const MstArticle = lazy(() => import("./assets/MstArticle-DANL1NoI.js"));
const FormArticle = lazy(() => import("./assets/FormArticle-24ztnRRU.js"));
const EditArticle = lazy(() => import("./assets/EditArticle-DOjOKvN4.js"));
const Users = lazy(() => import("./assets/Users-D1g8Kpou.js"));
const Registration = lazy(() => import("./assets/Registration-YSOi6PWb.js"));
const UserProfiles = lazy(() => import("./assets/UserProfiles-Dlf31wrx.js"));
const MediaForm = lazy(() => import("./assets/MediaForm-Bm6Mdea7.js"));
const MediaLibrary = lazy(() => import("./assets/MediaLibrary-D0SK6DLL.js"));
const JobApplicant = lazy(() => import("./assets/JobApplicant-B5BEik26.js"));
const Subscribers = lazy(() => import("./assets/Subscribers-5n-taFcu.js"));
const Blank = lazy(() => import("./assets/Blank-BLnqJ14h.js"));
const FormElements = lazy(() => import("./assets/FormElements-BmbpxuES.js"));
const SignIn = lazy(() => import("./assets/SignIn-B_XMD7jU.js"));
const adminRoutes = [
  { path: "/signin", element: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(SignIn, {}) }) },
  {
    path: "/admin",
    element: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(Fragment, {}), children: /* @__PURE__ */ jsx(AppLayout, {}) }),
    children: [
      {
        index: true,
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(Home, {}) })
      },
      {
        path: "setting",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(SettingPage, {}) })
      },
      {
        path: "mst_locations",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(MstLocations, {}) })
      },
      {
        path: "mst_categories",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(MstCategories, {}) })
      },
      {
        path: "mst_tags",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(MstTags, {}) })
      },
      {
        path: "mst_templates",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(TemplateLayout, {}) }),
        children: [
          {
            index: true,
            element: /* @__PURE__ */ jsx(MstTemplates, {})
          },
          // { path: "edit-exp", element: <LocationTemplate /> },
          { path: "edit", element: /* @__PURE__ */ jsx(LocationTemplateExp, {}) },
          {
            path: "about",
            element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(AboutTemplate, {}) })
          },
          {
            path: "general",
            element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(GeneralTemplate, {}) })
          }
        ]
      },
      {
        path: "mst_article",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { children: /* @__PURE__ */ jsx(ArticleAdmin, {}) }),
        children: [
          { index: true, element: /* @__PURE__ */ jsx(MstArticle, {}) },
          { path: "add", element: /* @__PURE__ */ jsx(EditArticle, { action: "add" }) },
          { path: "edit/:id", element: /* @__PURE__ */ jsx(EditArticle, { action: "edit" }) },
          { path: ":country", element: /* @__PURE__ */ jsx(FormArticle, {}) }
        ]
      },
      {
        path: "users",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(Users, {}) })
      },
      {
        path: "registration",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(Registration, {}) })
      },
      { path: "profile", element: /* @__PURE__ */ jsx(UserProfiles, {}) },
      { path: "add_media", element: /* @__PURE__ */ jsx(MediaForm, {}) },
      { path: "media_library", element: /* @__PURE__ */ jsx(MediaLibrary, {}) },
      { path: "blank", element: /* @__PURE__ */ jsx(Blank, {}) },
      { path: "form-elements", element: /* @__PURE__ */ jsx(FormElements, {}) },
      {
        path: "subscriber_list",
        element: /* @__PURE__ */ jsx(ProtectedRoute, { allowedUserLevel: ["super_admin"], children: /* @__PURE__ */ jsx(Subscribers, {}) })
      },
      { path: "socmed", element: /* @__PURE__ */ jsx(SocmedSettingPage, {}) },
      { path: "configSMTP", element: /* @__PURE__ */ jsx(ConfigSMTP, {}) },
      { path: "job_applicant", element: /* @__PURE__ */ jsx(JobApplicant, {}) }
    ]
  }
];
const { HelmetProvider } = pkg;
function render(url, initialData) {
  const memoryRouter = createMemoryRouter(adminRoutes, {
    initialEntries: [url]
  });
  const { initialTaxonomies, initialRoute, initialContent, initialTemplateContent, initialAuth, initialTime } = initialData;
  const helmetContext = {};
  return new Promise((resolve, reject) => {
    const stream = new PassThrough();
    let html = "";
    let didError = false;
    const { pipe } = renderToPipeableStream(
      /* @__PURE__ */ jsx(TimeProvider, { initialData: initialTime, children: /* @__PURE__ */ jsx(TaxonomyProvider, { initialData: initialTaxonomies, children: /* @__PURE__ */ jsx(RouteProvider, { initialData: initialRoute, children: /* @__PURE__ */ jsx(ContentProvider, { initialData: initialContent, children: /* @__PURE__ */ jsx(HeaderContentProvider, { initialData: initialTemplateContent, children: /* @__PURE__ */ jsx(AuthProvider, { initialData: initialAuth, children: /* @__PURE__ */ jsx(HelmetProvider, { context: helmetContext, children: /* @__PURE__ */ jsx(RouterProvider, { router: memoryRouter }) }) }) }) }) }) }) }),
      {
        onAllReady() {
          stream.on("data", (chunk) => {
            html += chunk.toString();
          });
          stream.on("end", () => {
            const { helmet } = helmetContext;
            const emptyHelmet = { title: "", meta: "", link: "" };
            resolve({
              appHtml: html,
              helmet: helmet || emptyHelmet
            });
          });
          pipe(stream);
        },
        onError(err) {
          didError = true;
          reject(err);
        }
      }
    );
    setTimeout(() => {
      if (didError) reject(new Error("SSR stream timeout"));
    }, 1e4);
  });
}
export {
  ProtectedRoute as P,
  render
};
