import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import * as React from "react";
import { useState, useEffect, useId, useRef } from "react";
import { NavLink as NavLink$1 } from "react-router-dom";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { g as getTemplateByUrl } from "./template.service-CqPQU38k.js";
import { Link, useNavigate, NavLink, Outlet } from "react-router";
import Skeleton from "react-loading-skeleton";
import { c as useHeaderContent, d as useRoute, b as useTaxonomies } from "./TimeContext-BxmeFsde.js";
import ReactSelect from "react-select";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { N as NotificationProvider } from "./NotificationContext-BSzMliXN.js";
import "react-fast-compare";
import "invariant";
import "shallowequal";
import "axios";
const SvgFacebook = (props) => /* @__PURE__ */ React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_239_890)" }, /* @__PURE__ */ React.createElement("path", { d: "M12 0C5.37264 0 0 5.37264 0 12C0 17.6275 3.87456 22.3498 9.10128 23.6467V15.6672H6.62688V12H9.10128V10.4198C9.10128 6.33552 10.9498 4.4424 14.9597 4.4424C15.72 4.4424 17.0318 4.59168 17.5685 4.74048V8.06448C17.2853 8.03472 16.7933 8.01984 16.1822 8.01984C14.2147 8.01984 13.4544 8.76528 13.4544 10.703V12H17.3741L16.7006 15.6672H13.4544V23.9122C19.3963 23.1946 24.0005 18.1354 24.0005 12C24 5.37264 18.6274 0 12 0Z", fill: "white" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_239_890" }, /* @__PURE__ */ React.createElement("rect", { width: 24, height: 24, fill: "white" }))));
const SvgInstagram = (props) => /* @__PURE__ */ React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_239_891)" }, /* @__PURE__ */ React.createElement("path", { d: "M12 2.16094C15.2063 2.16094 15.5859 2.175 16.8469 2.23125C18.0188 2.28281 18.6516 2.47969 19.0734 2.64375C19.6313 2.85938 20.0344 3.12188 20.4516 3.53906C20.8734 3.96094 21.1313 4.35938 21.3469 4.91719C21.5109 5.33906 21.7078 5.97656 21.7594 7.14375C21.8156 8.40937 21.8297 8.78906 21.8297 11.9906C21.8297 15.1969 21.8156 15.5766 21.7594 16.8375C21.7078 18.0094 21.5109 18.6422 21.3469 19.0641C21.1313 19.6219 20.8687 20.025 20.4516 20.4422C20.0297 20.8641 19.6313 21.1219 19.0734 21.3375C18.6516 21.5016 18.0141 21.6984 16.8469 21.75C15.5813 21.8062 15.2016 21.8203 12 21.8203C8.79375 21.8203 8.41406 21.8062 7.15313 21.75C5.98125 21.6984 5.34844 21.5016 4.92656 21.3375C4.36875 21.1219 3.96563 20.8594 3.54844 20.4422C3.12656 20.0203 2.86875 19.6219 2.65313 19.0641C2.48906 18.6422 2.29219 18.0047 2.24063 16.8375C2.18438 15.5719 2.17031 15.1922 2.17031 11.9906C2.17031 8.78438 2.18438 8.40469 2.24063 7.14375C2.29219 5.97187 2.48906 5.33906 2.65313 4.91719C2.86875 4.35938 3.13125 3.95625 3.54844 3.53906C3.97031 3.11719 4.36875 2.85938 4.92656 2.64375C5.34844 2.47969 5.98594 2.28281 7.15313 2.23125C8.41406 2.175 8.79375 2.16094 12 2.16094ZM12 0C8.74219 0 8.33438 0.0140625 7.05469 0.0703125C5.77969 0.126563 4.90313 0.332812 4.14375 0.628125C3.35156 0.9375 2.68125 1.34531 2.01563 2.01562C1.34531 2.68125 0.9375 3.35156 0.628125 4.13906C0.332812 4.90313 0.126563 5.775 0.0703125 7.05C0.0140625 8.33437 0 8.74219 0 12C0 15.2578 0.0140625 15.6656 0.0703125 16.9453C0.126563 18.2203 0.332812 19.0969 0.628125 19.8563C0.9375 20.6484 1.34531 21.3188 2.01563 21.9844C2.68125 22.65 3.35156 23.0625 4.13906 23.3672C4.90313 23.6625 5.775 23.8687 7.05 23.925C8.32969 23.9812 8.7375 23.9953 11.9953 23.9953C15.2531 23.9953 15.6609 23.9812 16.9406 23.925C18.2156 23.8687 19.0922 23.6625 19.8516 23.3672C20.6391 23.0625 21.3094 22.65 21.975 21.9844C22.6406 21.3188 23.0531 20.6484 23.3578 19.8609C23.6531 19.0969 23.8594 18.225 23.9156 16.95C23.9719 15.6703 23.9859 15.2625 23.9859 12.0047C23.9859 8.74688 23.9719 8.33906 23.9156 7.05938C23.8594 5.78438 23.6531 4.90781 23.3578 4.14844C23.0625 3.35156 22.6547 2.68125 21.9844 2.01562C21.3188 1.35 20.6484 0.9375 19.8609 0.632812C19.0969 0.3375 18.225 0.13125 16.95 0.075C15.6656 0.0140625 15.2578 0 12 0Z", fill: "white" }), /* @__PURE__ */ React.createElement("path", { d: "M12 5.83594C8.59688 5.83594 5.83594 8.59688 5.83594 12C5.83594 15.4031 8.59688 18.1641 12 18.1641C15.4031 18.1641 18.1641 15.4031 18.1641 12C18.1641 8.59688 15.4031 5.83594 12 5.83594ZM12 15.9984C9.79219 15.9984 8.00156 14.2078 8.00156 12C8.00156 9.79219 9.79219 8.00156 12 8.00156C14.2078 8.00156 15.9984 9.79219 15.9984 12C15.9984 14.2078 14.2078 15.9984 12 15.9984Z", fill: "white" }), /* @__PURE__ */ React.createElement("path", { d: "M19.8469 5.59238C19.8469 6.38926 19.2 7.03145 18.4078 7.03145C17.6109 7.03145 16.9688 6.38457 16.9688 5.59238C16.9688 4.79551 17.6156 4.15332 18.4078 4.15332C19.2 4.15332 19.8469 4.8002 19.8469 5.59238Z", fill: "white" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_239_891" }, /* @__PURE__ */ React.createElement("rect", { width: 24, height: 24, fill: "white" }))));
const SvgLinkedin = (props) => /* @__PURE__ */ React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_239_892)" }, /* @__PURE__ */ React.createElement("path", { d: "M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z", fill: "white" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_239_892" }, /* @__PURE__ */ React.createElement("rect", { width: 24, height: 24, fill: "white" }))));
const SvgHamburger = (props) => /* @__PURE__ */ React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 25", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_643_2614)" }, /* @__PURE__ */ React.createElement("path", { d: "M3 18.5H21V16.5H3V18.5ZM3 13.5H21V11.5H3V13.5ZM3 6.5V8.5H21V6.5H3Z", fill: "#a07b4f" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_643_2614" }, /* @__PURE__ */ React.createElement("rect", { width: 24, height: 24, fill: "white", transform: "translate(0 0.5)" }))));
const SvgCloseMenu = (props) => /* @__PURE__ */ React.createElement("svg", { width: "1em", height: "1em", viewBox: "0 0 24 25", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("g", { clipPath: "url(#clip0_631_2091)" }, /* @__PURE__ */ React.createElement("path", { d: "M19 6.91L17.59 5.5L12 11.09L6.41 5.5L5 6.91L10.59 12.5L5 18.09L6.41 19.5L12 13.91L17.59 19.5L19 18.09L13.41 12.5L19 6.91Z", fill: "#a07b4f" })), /* @__PURE__ */ React.createElement("defs", null, /* @__PURE__ */ React.createElement("clipPath", { id: "clip0_631_2091" }, /* @__PURE__ */ React.createElement("rect", { width: 24, height: 24, fill: "white", transform: "translate(0 0.5)" }))));
const IMAGE_URL = "http://localhost:8080";
const NavLogo = ({ to = "/" }) => {
  const { initialData } = useHeaderContent();
  const [defaultImage, setDefaultImage] = useState((initialData == null ? void 0 : initialData.logo) ?? false);
  const [image, setImage] = useState((initialData == null ? void 0 : initialData.currentLogo) ? { url: initialData.currentLogo, id: 0 } : false);
  const { actualRoute, clientChange } = useRoute();
  useEffect(() => {
    if (!defaultImage) {
      (async () => {
        var _a;
        try {
          const getImage = await getTemplateByUrl("/logo-header");
          if ((getImage == null ? void 0 : getImage.status_code) === 200 && ((_a = getImage.data) == null ? void 0 : _a.content)) {
            setDefaultImage(JSON.parse(getImage.data.content));
          }
        } catch (e) {
          console.log("Error fetching logo template:", e);
        }
      })();
    }
  }, []);
  useEffect(() => {
    if (!clientChange) return;
    (async () => {
      try {
        if (actualRoute.region && actualRoute.region.site_logo) {
          setImage({ url: actualRoute.region.site_logo, id: 0 });
          return;
        }
        if (actualRoute.city && actualRoute.city.site_logo) {
          setImage({ url: actualRoute.city.site_logo, id: 0 });
          return;
        }
        if (actualRoute.country && actualRoute.country.site_logo) {
          setImage({ url: actualRoute.country.site_logo, id: 0 });
          return;
        }
        setImage(false);
      } catch (e) {
        console.log(e);
      }
    })();
  }, [actualRoute, clientChange]);
  const renderImage = () => {
    if (!defaultImage && !image) {
      return /* @__PURE__ */ jsx(Skeleton, { height: "76px", width: "141px", containerClassName: "logo-wrapper-skeleton inline-block" });
    }
    if (!image && defaultImage) return /* @__PURE__ */ jsx("img", { src: defaultImage ? `${IMAGE_URL}/${defaultImage.url}` : "#", style: { display: defaultImage ? "block" : "none" }, width: 230, height: 76, alt: "Logo" });
    return /* @__PURE__ */ jsx("img", { src: image ? `${IMAGE_URL}/${image.url}` : "#", style: { display: image ? "block" : "none" }, width: 230, height: 76, alt: "Logo" });
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(Link, { to, children: renderImage() }) });
};
const SelectNav = ({ onChange, options, value, defaultLabel }) => {
  const instanceId = useId();
  const defaultValue = value ? options.filter((option) => value == option.value)[0] : { value: defaultLabel, label: defaultLabel };
  const emptyOption = { value: defaultLabel, label: defaultLabel };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    ReactSelect,
    {
      instanceId,
      value: defaultValue,
      defaultValue: emptyOption,
      options: [emptyOption, ...options],
      isSearchable: false,
      onChange: (option) => {
        if ((option == null ? void 0 : option.value) == defaultLabel) {
          onChange("");
        } else {
          onChange((option == null ? void 0 : option.value) ? option.value : "");
        }
      },
      styles: {
        control: (style, state) => {
          return { ...style, borderRadius: "0", border: 0, borderBottom: state.getValue()[0].value == defaultLabel ? "1px solid #000" : "1px solid transparent" };
        },
        menu: (style) => {
          return { ...style, borderRadius: 0 };
        },
        option: (style, { isSelected }) => {
          if (isSelected) {
            return { ...style, backgroundColor: "var(--color-front-red)", color: "#fff" };
          }
          return style;
        }
      },
      classNames: {
        control: (state) => {
          if (state.getValue()[0].value == defaultLabel) {
            return "bg-white";
          }
          return "!bg-front-red !text-white";
        },
        singleValue: (state) => {
          if (state.getValue()[0].value == defaultLabel) {
            return "text-black uppercase text-front-body-big";
          }
          return "!text-white uppercase text-front-body-big";
        },
        indicatorSeparator: () => "hidden",
        dropdownIndicator: (state) => {
          if (state.getValue()[0].value == defaultLabel) return "!text-front-black-grey";
          return "!text-white";
        },
        option: () => {
          return "hover:!bg-front-red hover:!text-white active:!bg-front-red active:!text-white";
        }
      }
    }
  ) });
};
const NavLocation = () => {
  var _a, _b, _c;
  const [cities, setCities] = useState();
  const [regions, setRegions] = useState();
  const { actualRoute } = useRoute();
  const { taxonomies } = useTaxonomies();
  const filteredCountries = (_a = { ...taxonomies }.countries) == null ? void 0 : _a.filter((coun) => coun.id != 999);
  const filteredTax = { ...taxonomies, countries: filteredCountries };
  const swiperRef = useRef(null);
  const nextRef = useRef(null);
  const prevRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    var _a2, _b2;
    const actualCountry = actualRoute.country;
    if (actualCountry) {
      setCities((_a2 = filteredTax == null ? void 0 : filteredTax.cities) == null ? void 0 : _a2.filter((city) => city.id_parent == actualCountry.id));
    }
    const actualCity = actualRoute.city;
    if (actualCity) {
      setRegions((_b2 = filteredTax == null ? void 0 : filteredTax.regions) == null ? void 0 : _b2.filter((reg) => reg.id_parent == actualCity.id));
    }
  }, [actualRoute]);
  useEffect(() => {
    setTimeout(() => {
      if (swiperRef.current) {
        swiperRef.current.swiper.init();
      }
    }, 1e3);
  }, []);
  const changeCountryHandler = (country) => {
    var _a2, _b2;
    if (country == "") {
      navigate(`${(actualRoute == null ? void 0 : actualRoute.category) ? `/${(_a2 = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _a2.slug_title}` : "/"}`);
      return;
    }
    navigate(`/${country}${(actualRoute == null ? void 0 : actualRoute.category) ? `/${(_b2 = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _b2.slug_title}` : ""}`);
    return;
  };
  const changeCityHandler = (city) => {
    var _a2, _b2, _c2, _d;
    if (city == "") {
      navigate(`/${(_a2 = actualRoute == null ? void 0 : actualRoute.country) == null ? void 0 : _a2.slug}${(actualRoute == null ? void 0 : actualRoute.category) ? `/${(_b2 = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _b2.slug_title}` : ""}`);
      return;
    }
    navigate(`/${(_c2 = actualRoute == null ? void 0 : actualRoute.country) == null ? void 0 : _c2.slug}/${city}${(actualRoute == null ? void 0 : actualRoute.category) ? `/${(_d = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _d.slug_title}` : ""}`);
    return;
  };
  const changeRegionHandler = (region) => {
    var _a2, _b2, _c2, _d, _e, _f;
    if (region == "") {
      navigate(`/${(_a2 = actualRoute == null ? void 0 : actualRoute.country) == null ? void 0 : _a2.slug}/${(_b2 = actualRoute == null ? void 0 : actualRoute.city) == null ? void 0 : _b2.slug}/${(actualRoute == null ? void 0 : actualRoute.category) ? `/${(_c2 = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _c2.slug_title}` : ""}`);
      return;
    }
    navigate(`/${(_d = actualRoute == null ? void 0 : actualRoute.country) == null ? void 0 : _d.slug}/${(_e = actualRoute == null ? void 0 : actualRoute.city) == null ? void 0 : _e.slug}/${region}${(actualRoute == null ? void 0 : actualRoute.category) ? `/${(_f = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _f.slug_title}` : ""}`);
    return;
  };
  const getCountryUrl = (country) => {
    return `/${country.slug}${(actualRoute == null ? void 0 : actualRoute.category) ? `/${actualRoute.category.slug_title}` : ""}`;
  };
  if (actualRoute.country) {
    return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row gap-y-2 md:gap-y-0 md:gap-x-3", children: [
      /* @__PURE__ */ jsx("div", { className: "md:w-[250px] w-full", children: /* @__PURE__ */ jsx(SelectNav, { defaultLabel: "All Asia", redOnActive: true, onChange: changeCountryHandler, value: (actualRoute == null ? void 0 : actualRoute.country) ? actualRoute.country.slug : void 0, options: ((_b = filteredTax == null ? void 0 : filteredTax.countries) == null ? void 0 : _b.map((country) => {
        return { value: country.slug, label: country.name };
      })) ?? [] }) }),
      !!(cities && actualRoute.country && cities.length) && /* @__PURE__ */ jsx("div", { className: "md:w-[250px] w-full", children: /* @__PURE__ */ jsx(SelectNav, { defaultLabel: "Explore City", onChange: changeCityHandler, value: actualRoute.city ? actualRoute.city.slug : void 0, options: cities.map((city) => {
        return { value: city.slug, label: city.name };
      }) }) }),
      !!(regions && actualRoute.city && regions.length) && /* @__PURE__ */ jsx("div", { className: "md:w-[250px] w-full", children: /* @__PURE__ */ jsx(SelectNav, { defaultLabel: "Explore by Area", onChange: changeRegionHandler, value: actualRoute.region ? actualRoute.region.slug : void 0, options: regions.map((region) => {
        return { value: region.slug, label: region.name };
      }) }) })
    ] }) });
  }
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "country-select-wrapper flex md:gap-x-[10px] gap-y-4 md:items-center", children: [
    /* @__PURE__ */ jsx("p", { className: "font-serif text-front-subtitle-big font-bold flex-shrink-0", children: "EXPLORE COUNTRIES" }),
    /* @__PURE__ */ jsx("div", { className: "arrow-left arrow-wrapper", ref: prevRef, children: /* @__PURE__ */ jsx("div", { className: "arrow", children: /* @__PURE__ */ jsx("img", { src: "/images/icons/chevron-left.svg", alt: "" }) }) }),
    /* @__PURE__ */ jsx(
      Swiper,
      {
        slidesPerView: 3,
        init: true,
        spaceBetween: 15,
        ref: swiperRef,
        modules: [Navigation],
        navigation: {
          enabled: true,
          nextEl: nextRef.current,
          prevEl: prevRef.current
        },
        children: (_c = filteredTax.countries) == null ? void 0 : _c.map((country) => {
          return /* @__PURE__ */ jsx(SwiperSlide, { children: /* @__PURE__ */ jsx("div", { className: "country uppercase text-center items-center", children: /* @__PURE__ */ jsx(Link, { className: "text-front-body border-[2px] border-front-red flex justify-center items-center h-10 w-full transition text-white bg-front-red hover:text-black hover:bg-white", to: getCountryUrl(country), children: country.name }) }, `navlocation-explore-${country.id}`) });
        })
      }
    ),
    /* @__PURE__ */ jsx("div", { className: "arrow-right arrow-wrapper", ref: nextRef, children: /* @__PURE__ */ jsx("div", { className: "arrow", children: /* @__PURE__ */ jsx("img", { src: "/images/icons/chevron-left.svg", alt: "" }) }) })
  ] }) });
};
const MobileMenu = ({ isModalOpen = false, closeModal }) => {
  var _a, _b;
  const { actualRoute } = useRoute();
  const mobileMenuRef = useRef(null);
  const { initialData } = useHeaderContent();
  const { taxonomies } = useTaxonomies();
  const { contextSafe } = useGSAP({ scope: mobileMenuRef });
  const [isClient, setIsClient] = useState(false);
  const [headerMenus, setHeaderMenus] = useState((initialData == null ? void 0 : initialData.header) ?? []);
  const tlRef = useRef(null);
  const onMouseLeaveHandler = contextSafe((e) => {
    if (e.currentTarget.classList.contains("is-active")) return;
    gsap.to(e.target, {
      "--hover-width": "0%",
      "--hover-color": "#a07b4f",
      "--hover-text": "#101828"
      // '--hover-translate': '50%'
    });
  });
  const onMouseEnterHandler = contextSafe((e) => {
    if (e.currentTarget.classList.contains("is-active")) return;
    gsap.to(e.currentTarget, {
      "--hover-width": "100%",
      "--hover-color": "#a07b4f",
      "--hover-text": "#a07b4f"
      // '--hover-translate': '0%'
    });
  });
  const generateTo = (url) => {
    var _a2;
    if (actualRoute == null ? void 0 : actualRoute.article) {
      return `/${(_a2 = actualRoute.country) == null ? void 0 : _a2.slug}/${url}`;
    }
    if (actualRoute == null ? void 0 : actualRoute.category) {
      return "../" + url;
    }
    return url;
  };
  useEffect(() => {
    setIsClient(true);
    if (!headerMenus || headerMenus.length === 0) {
      (async () => {
        var _a2, _b2, _c, _d;
        try {
          const getTemplate = await getTemplateByUrl("/header");
          if ((getTemplate == null ? void 0 : getTemplate.data) && getTemplate.status_code == 200) {
            const jsonData = JSON.parse(getTemplate.data.content);
            setHeaderMenus(jsonData);
          } else {
            const fallbackMenus = ((_b2 = (_a2 = taxonomies.categories) == null ? void 0 : _a2.filter((cat) => !cat.id_parent)) == null ? void 0 : _b2.map((cat) => ({
              label: cat.title,
              url: cat.slug_title,
              linkCategory: cat.id
            }))) ?? [];
            setHeaderMenus(fallbackMenus);
          }
        } catch (e) {
          console.log("Error fetching header template:", e);
          const fallbackMenus = ((_d = (_c = taxonomies.categories) == null ? void 0 : _c.filter((cat) => !cat.id_parent)) == null ? void 0 : _d.map((cat) => ({
            label: cat.title,
            url: cat.slug_title,
            linkCategory: cat.id
          }))) ?? [];
          setHeaderMenus(fallbackMenus);
        }
      })();
    }
  }, [taxonomies.categories]);
  useEffect(() => {
    if (!isClient) return;
    const menuEl = mobileMenuRef.current;
    if (!menuEl || tlRef.current) return;
    const tl = gsap.timeline({ paused: true });
    tl.fromTo(menuEl, {
      translateX: "100%"
    }, {
      translateX: "0%"
    });
    tlRef.current = tl;
  }, [isClient]);
  useEffect(() => {
    const menuEl = mobileMenuRef.current;
    const tl = tlRef.current;
    if (!menuEl || !isClient || !tl) return;
    if (isModalOpen) {
      tl.play();
      return;
    } else {
      tl.reverse();
      return;
    }
  }, [isModalOpen, isClient]);
  return /* @__PURE__ */ jsx("aside", { ref: mobileMenuRef, className: "fixed inset-0 bg-white h-full z-[999] block md:hidden", style: { transform: "translateX(100%)" }, children: /* @__PURE__ */ jsxs("div", { className: "flex flex-col h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-6 flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "logo-wrapper w-max", children: /* @__PURE__ */ jsx(NavLogo, { url: "/logo-header", to: "/" }) }),
      /* @__PURE__ */ jsx("div", { className: "icons-wrapper", children: /* @__PURE__ */ jsx("div", { className: "hamburger", onClick: () => {
        closeModal();
      }, children: /* @__PURE__ */ jsx(SvgCloseMenu, { className: "w-[32px] h-[32px]" }) }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "line bg-black h-[1px] w-full" }),
    /* @__PURE__ */ jsx("div", { className: "location-wrapper nav-location-wrapper flex flex-col flex-0", children: /* @__PURE__ */ jsxs("div", { className: "location", children: [
      /* @__PURE__ */ jsx("div", { className: "inner container mx-auto py-4", children: /* @__PURE__ */ jsx(NavLocation, {}) }),
      /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: "line bg-black h-[1px] w-full" }) })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "nav-category-wrapper flex flex-col flex-1 overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "inner container mx-auto py-4 flex-1 flex flex-col overflow-hidden", children: /* @__PURE__ */ jsx("div", { className: "menus-wrapper flex-1 overflow-y-auto", children: (_b = (_a = taxonomies.categories) == null ? void 0 : _a.filter((cat) => {
      var _a2;
      return (_a2 = headerMenus == null ? void 0 : headerMenus.map((ca) => ca.linkCategory)) == null ? void 0 : _a2.includes(cat.id);
    })) == null ? void 0 : _b.map((menu, i) => {
      var _a2;
      return /* @__PURE__ */ jsx("div", { className: "menu mb-4", children: /* @__PURE__ */ jsx(NavLink, { relative: "path", onMouseLeave: onMouseLeaveHandler, onMouseEnter: onMouseEnterHandler, className: `menu-link text-front-body-big flex-1 text-nowrap uppercase text-black${menu.slug_title == ((_a2 = actualRoute == null ? void 0 : actualRoute.category) == null ? void 0 : _a2.slug_title) ? " is-active" : ""}`, to: generateTo(menu.slug_title), children: menu.title }, i) }, `mobile-${menu.id}`);
    }) }) }) }),
    /* @__PURE__ */ jsx("div", { className: "outer bg-front-red flex-0", children: /* @__PURE__ */ jsx("div", { className: "py-4", children: /* @__PURE__ */ jsxs("div", { className: "item flex justify-center gap-x-6", children: [
      /* @__PURE__ */ jsx(Link, { to: "#", target: "_blank", children: /* @__PURE__ */ jsx(SvgFacebook, { className: "w-[24px] h-[24px]" }) }),
      /* @__PURE__ */ jsx(Link, { to: "#", target: "_blank", children: /* @__PURE__ */ jsx(SvgInstagram, { className: "w-[24px] h-[24px]" }) }),
      /* @__PURE__ */ jsx(Link, { to: "#", target: "_blank", children: /* @__PURE__ */ jsx(SvgLinkedin, { className: "w-[24px] h-[24px]" }) })
    ] }) }) })
  ] }) });
};
const SearchBar = ({ search, setSearch }) => {
  return /* @__PURE__ */ jsx(Fragment, {});
};
const MenuNav = ({ menu, menus }) => {
  const { taxonomies } = useTaxonomies();
  const { actualRoute } = useRoute();
  const menuRef = useRef(null);
  const generateTo = (url, actualRoute2) => {
    var _a;
    if (actualRoute2 == null ? void 0 : actualRoute2.article) {
      return `/${(_a = actualRoute2.country) == null ? void 0 : _a.slug}/${url}`;
    }
    return `${actualRoute2.country ? `/${actualRoute2.country.slug}` : ""}${actualRoute2.city ? `/${actualRoute2.city.slug}` : ""}${actualRoute2.region ? `/${actualRoute2.region.slug}` : ""}/${url}`;
  };
  const { contextSafe } = useGSAP({ scope: menuRef });
  const onMouseLeaveHandler = contextSafe((e) => {
    if (e.currentTarget.classList.contains("is-active")) return;
    gsap.to(e.target, {
      "--hover-width": "0%",
      "--hover-color": "#a07b4f",
      "--hover-text": "#101828"
      // '--hover-translate': '50%'
    });
  });
  const onMouseEnterHandler = contextSafe((e) => {
    if (e.currentTarget.classList.contains("is-active")) return;
    gsap.to(e.currentTarget, {
      "--hover-width": "100%",
      "--hover-color": "#a07b4f",
      "--hover-text": "#a07b4f"
      // '--hover-translate': '0%'
    });
  });
  const isActive = () => {
    var _a, _b, _c, _d;
    if (menu.id == ((_a = actualRoute.category) == null ? void 0 : _a.id)) return true;
    if (((_b = actualRoute.category) == null ? void 0 : _b.id_parent) && !menus.find((men) => {
      var _a2;
      return ((_a2 = actualRoute.category) == null ? void 0 : _a2.id) == men.id;
    })) return ((_d = (_c = taxonomies.categories) == null ? void 0 : _c.find((cat) => {
      var _a2;
      return ((_a2 = actualRoute.category) == null ? void 0 : _a2.id_parent) == cat.id;
    })) == null ? void 0 : _d.id) == menu.id;
    return false;
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("div", { className: "menu", ref: menuRef, children: /* @__PURE__ */ jsx(NavLink$1, { relative: "route", onMouseLeave: onMouseLeaveHandler, onMouseEnter: onMouseEnterHandler, className: `menu-link text-front-body-big flex-1 text-nowrap uppercase text-black${isActive() ? " is-active" : ""}`, to: generateTo(menu.slug_title, actualRoute), children: menu.title }, menu.id) }) });
};
const Header = () => {
  var _a, _b;
  const { initialData } = useHeaderContent();
  const [isClient, setIsClient] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setStateSearch] = useState("");
  const { taxonomies } = useTaxonomies();
  const [headerMenus, setHeaderMenus] = useState((initialData == null ? void 0 : initialData.header) ?? []);
  const headerRef = useRef(null);
  const locationRef = useRef(null);
  const categoryRef = useRef(null);
  const arrowRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const { actualRoute } = useRoute();
  useEffect(() => {
    if (!isClient) return;
    const element = headerRef.current;
    if (!element) return;
    document.documentElement.style.setProperty("--nav-height", `${element.offsetHeight}px`);
    const observer = new ResizeObserver(() => {
      document.documentElement.style.setProperty("--nav-height", `${element.offsetHeight}px`);
    });
    return observer.disconnect();
  }, [isClient]);
  useEffect(() => {
    setIsClient(true);
    if (!headerMenus || headerMenus.length === 0) {
      (async () => {
        var _a2, _b2, _c, _d;
        try {
          const getTemplate = await getTemplateByUrl("/header");
          if ((getTemplate == null ? void 0 : getTemplate.data) && getTemplate.status_code == 200) {
            const jsonData = JSON.parse(getTemplate.data.content);
            setHeaderMenus(jsonData);
          } else {
            const fallbackMenus = ((_b2 = (_a2 = taxonomies.categories) == null ? void 0 : _a2.filter((cat) => !cat.id_parent)) == null ? void 0 : _b2.map((cat) => ({
              label: cat.title,
              url: cat.slug_title,
              linkCategory: cat.id
            }))) ?? [];
            setHeaderMenus(fallbackMenus);
          }
        } catch (e) {
          console.log("Error fetching header template:", e);
          const fallbackMenus = ((_d = (_c = taxonomies.categories) == null ? void 0 : _c.filter((cat) => !cat.id_parent)) == null ? void 0 : _d.map((cat) => ({
            label: cat.title,
            url: cat.slug_title,
            linkCategory: cat.id
          }))) ?? [];
          setHeaderMenus(fallbackMenus);
        }
      })();
    }
  }, [taxonomies.categories]);
  useEffect(() => {
    setIsModalOpen(false);
  }, [actualRoute]);
  useEffect(() => {
    if (!isClient) return;
    const catEl = categoryRef.current;
    const parent = catEl == null ? void 0 : catEl.parentElement;
    if (!catEl || !parent) return;
    const resize = () => {
      if ((parent == null ? void 0 : parent.scrollWidth) > (catEl == null ? void 0 : catEl.offsetWidth)) {
        if (catEl.classList.contains("nav-scroll-overflow")) return;
        catEl.classList.add("nav-scroll-overflow");
        parent.classList.add("parent-nav-scroll-overflow");
      }
    };
    const config = { attributes: true, childList: true, subtree: true };
    const mutationObserver = new MutationObserver(resize);
    resize();
    mutationObserver.observe(catEl, config);
    return () => {
      mutationObserver.disconnect();
    };
  }, [isClient]);
  useEffect(() => {
    const arrowEl = arrowRef.current;
    const catEl = categoryRef.current;
    if (!arrowEl || !catEl) return;
    const scrollStep = 180;
    const scrollRight = () => {
      gsap.to(catEl, {
        scrollLeft: `+=${scrollStep}`
      });
    };
    arrowEl.addEventListener("click", scrollRight);
    return () => {
      arrowEl.removeEventListener("click", scrollRight);
    };
  }, []);
  useEffect(() => {
    if (!isClient) return;
    const catEl = categoryRef.current;
    if (!catEl) return;
    catEl.querySelectorAll(".menu-link").forEach((el) => {
      if (el.classList.contains("is-active")) return;
      gsap.set(el, {
        "--hover-width": "0%",
        "--hover-color": "#a07b4f",
        "--hover-text": "#101828"
        // '--hover-translate': '50%'
      });
    });
    if (mobileMenuRef.current) {
      gsap.set(mobileMenuRef.current, {
        xPercent: 100
      });
    }
  }, [actualRoute, isClient]);
  useEffect(() => {
    const mobileMenuEl = mobileMenuRef.current;
    if (!mobileMenuEl) return;
    if (isModalOpen) {
      gsap.to(mobileMenuEl, {
        xPercent: 0
      });
    }
  }, [isModalOpen]);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const setSearch = (val) => {
    setStateSearch(val);
  };
  const toNav = () => {
    return `/${(actualRoute == null ? void 0 : actualRoute.country) ? actualRoute.country.slug : ""}${(actualRoute == null ? void 0 : actualRoute.city) ? `/${actualRoute.city.slug}` : ""}${(actualRoute == null ? void 0 : actualRoute.region) ? `/${actualRoute.region.slug}` : ""}`;
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs("header", { className: "relative top-0 left-0 right-0 z-[100] bg-white", ref: headerRef, children: [
      /* @__PURE__ */ jsxs("div", { className: "container mx-auto py-6 flex justify-between items-center", children: [
        /* @__PURE__ */ jsx("div", { className: "logo-wrapper w-max", children: /* @__PURE__ */ jsx(NavLogo, { url: "/logo-header", to: toNav() }) }),
        /* @__PURE__ */ jsxs("div", { className: "icons-wrapper flex items-center gap-x-4", children: [
          /* @__PURE__ */ jsx("div", { className: `item flex-1 max-w-[320px] block ${actualRoute.country ? "lg:hidden" : "lg:block"}`, children: /* @__PURE__ */ jsx(SearchBar, { search, setSearch }) }),
          /* @__PURE__ */ jsx("div", { className: "hamburger md:hidden block", onClick: () => {
            setIsModalOpen(true);
          }, children: /* @__PURE__ */ jsx(SvgHamburger, { className: "w-[32px] h-[32px]" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "line bg-black h-[1px] w-full" }),
      /* @__PURE__ */ jsxs("div", { className: "location-wrapper nav-location-wrapper", ref: locationRef, children: [
        /* @__PURE__ */ jsxs("div", { className: `inner container justify-between items-center mx-auto py-4 ${actualRoute.country ? "hidden md:flex" : ""}`, children: [
          /* @__PURE__ */ jsx("div", { className: "item", children: /* @__PURE__ */ jsx(NavLocation, {}) }),
          /* @__PURE__ */ jsx("div", { className: `item flex-1 hidden max-w-[320px] ${actualRoute.country ? "lg:block" : "lg:hidden"}`, children: /* @__PURE__ */ jsx(SearchBar, { search, setSearch }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "line bg-black h-[1px] w-full" }),
        /* @__PURE__ */ jsxs("div", { className: "inner container mx-auto py-4 nav-category-wrapper", children: [
          /* @__PURE__ */ jsx("div", { className: "menus-wrapper flex gap-x-4 md:gap-x-6", ref: categoryRef, children: (_b = (_a = taxonomies.categories) == null ? void 0 : _a.filter((cat) => {
            var _a2;
            return (_a2 = headerMenus == null ? void 0 : headerMenus.map((ca) => ca.linkCategory)) == null ? void 0 : _a2.includes(cat.id);
          })) == null ? void 0 : _b.map((menu) => /* @__PURE__ */ jsx(MenuNav, { menu, menus: headerMenus }, `header-menu-${menu.id}`)) }),
          /* @__PURE__ */ jsx("div", { className: "arrow", ref: arrowRef })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "line bg-black h-[1px] w-full" })
      ] })
    ] }),
    /* @__PURE__ */ jsx(MobileMenu, { isModalOpen, closeModal })
  ] });
};
const Footer = () => {
  var _a, _b;
  const { taxonomies } = useTaxonomies();
  const filteredCountries = (_a = { ...taxonomies }.countries) == null ? void 0 : _a.filter((coun) => coun.id != 999);
  const filteredTax = { ...taxonomies, countries: filteredCountries };
  return /* @__PURE__ */ jsxs("footer", { className: "footer", children: [
    /* @__PURE__ */ jsx("div", { className: "container py-12", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 md:gap-x-16 gap-y-10", children: [
      /* @__PURE__ */ jsx("div", { className: "col-span-12 mb-8", children: /* @__PURE__ */ jsx("div", { className: "logo-wrapper max-w", children: /* @__PURE__ */ jsx(NavLogo, { url: "/logo-header", to: "/" }) }) }),
      /* @__PURE__ */ jsx("div", { className: "md:col-span-6 col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "text-wrapper", children: [
        /* @__PURE__ */ jsx("p", { className: "text-front-body-big mb-8", children: "Welcome to What’s New Indonesia, your ultimate guide to exploring the big cities of Indonesia. Whether you are an expat, local, or tourist, we are here to help you discover the best things to do, places to stay and dine, and how to live life to the fullest" }),
        /* @__PURE__ */ jsxs("p", { className: "text-front-body-big mb-8", children: [
          "GoWork Fatmawati Private Office #107",
          /* @__PURE__ */ jsx("br", {}),
          "Jl. RS Fatmawati No 188 Blok A Cipete Jakarta Selatan 12420"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-front-body-big", children: [
          "Hp. +62813-8250-2771 ",
          /* @__PURE__ */ jsx("br", {}),
          "Email. admin@whatsnewindonesia.com"
        ] })
      ] }) }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 col-span-12", children: [
        /* @__PURE__ */ jsx("div", { className: "title-wrapper mb-2.5", children: /* @__PURE__ */ jsx("p", { className: "font-serif text-front-body-big", children: "Website Links" }) }),
        /* @__PURE__ */ jsxs("div", { className: "links-wrapper", children: [
          /* @__PURE__ */ jsx("div", { className: "link mb-2", children: /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "text-front-body-big", children: "Privacy Policy" }) }),
          /* @__PURE__ */ jsx("div", { className: "link", children: /* @__PURE__ */ jsx(Link, { to: "/privacy-policy", className: "text-front-body-big", children: "Term & Conditions" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "md:col-span-3 col-span-12", children: [
        /* @__PURE__ */ jsx("div", { className: "title-wrapper mb-2.5", children: /* @__PURE__ */ jsx("p", { className: "font-serif text-front-body-big", children: "Explore" }) }),
        /* @__PURE__ */ jsx("div", { className: "links-wrapper", children: (_b = filteredTax == null ? void 0 : filteredTax.countries) == null ? void 0 : _b.map((country, i) => {
          var _a2;
          return /* @__PURE__ */ jsx("div", { className: `link ${i + 1 == ((_a2 = filteredTax == null ? void 0 : filteredTax.countries) == null ? void 0 : _a2.length) ? "" : "mb-2"}`, children: /* @__PURE__ */ jsx(Link, { to: `/${country.slug}`, className: "text-front-body-big", children: country.name }) }, `footer-${country.slug}`);
        }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("div", { className: "outer py-5 bg-front-red", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "flex justify-between items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "item text-front-small text-white", children: "© 2025 - What’s New Asia" }),
      /* @__PURE__ */ jsxs("div", { className: "item flex gap-x-4", children: [
        /* @__PURE__ */ jsx(Link, { to: "#", target: "_blank", children: /* @__PURE__ */ jsx(SvgFacebook, {}) }),
        /* @__PURE__ */ jsx(Link, { to: "#", target: "_blank", children: /* @__PURE__ */ jsx(SvgInstagram, {}) }),
        /* @__PURE__ */ jsx(Link, { to: "#", target: "_blank", children: /* @__PURE__ */ jsx(SvgLinkedin, {}) })
      ] })
    ] }) }) })
  ] });
};
const FrontLayout = () => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, {}),
    /* @__PURE__ */ jsx(NotificationProvider, { children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(Footer, {})
  ] });
};
export {
  FrontLayout as default
};
