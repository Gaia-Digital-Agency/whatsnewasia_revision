import { jsx, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router";
import { B as Button } from "./Button-Cvygc_ZJ.js";
import { u as useAuth, b as useTaxonomies } from "./TimeContext-CSdMZCoU.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "axios";
const MstArticle = () => {
  const [countries, setCountries] = useState([]);
  const { userDetails } = useAuth();
  const { adminTaxonomies } = useTaxonomies();
  const navigate = useNavigate();
  if ((userDetails == null ? void 0 : userDetails.id_country) && userDetails.user_level !== "super_admin") {
    navigate(`/admin/mst_article/${userDetails == null ? void 0 : userDetails.id_country}`);
  }
  useEffect(() => {
    (async () => {
      if (adminTaxonomies.countries) {
        setCountries(adminTaxonomies.countries.map((coun) => ({ id: coun.id, name: coun.name, slug: coun.slug })));
      }
    })();
  }, [adminTaxonomies]);
  if (countries) {
    return /* @__PURE__ */ jsx("div", { className: "grid grid-cols-12 gap-8", children: countries.map((country) => /* @__PURE__ */ jsx("div", { className: "col-span-4", children: /* @__PURE__ */ jsx(Button, { className: "w-full", children: /* @__PURE__ */ jsx(Link, { to: `${country.id}`, className: "w-full", children: country.name }) }) }, country.slug)) });
  } else {
    return /* @__PURE__ */ jsx(Fragment, {});
  }
};
export {
  MstArticle as default
};
