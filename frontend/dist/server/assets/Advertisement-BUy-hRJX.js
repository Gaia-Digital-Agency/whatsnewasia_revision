import { jsx, Fragment } from "react/jsx-runtime";
const Advertisement = ({ ratio = "horizontal" }) => {
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx("div", { className: `ads relative w-full bg-[#d9d9d9] ${ratio == "vertical" ? "pt-[260%]" : "pt-[16%]"}`, children: /* @__PURE__ */ jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2", children: /* @__PURE__ */ jsx("p", { className: "text-front-small font-semibold text-front-black", children: "ADS PLACEMENT" }) }) }) }) }) });
};
export {
  Advertisement as A
};
