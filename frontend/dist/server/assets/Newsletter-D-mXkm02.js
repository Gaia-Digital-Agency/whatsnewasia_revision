import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { B as Button } from "./Button-CyhLA-74.js";
import { s as subscribeNewsletter } from "./newsletter.service-EDFmFm1T.js";
import { u as useNotification } from "./NotificationContext-BSzMliXN.js";
const Newsletter = () => {
  const [email, setEmail] = useState("");
  const { setNotification } = useNotification();
  const changeHandler = (e) => {
    setEmail(e.target.value);
  };
  const clickHandler = async () => {
    var _a;
    try {
      const subscribe = await subscribeNewsletter(email);
      setNotification({
        message: ((_a = subscribe == null ? void 0 : subscribe.data) == null ? void 0 : _a.message) ?? "Thanks for subscribing to our newsletter",
        type: "neutral"
      });
      setEmail("");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        setNotification({
          message: error.message,
          type: "fail"
        });
        return;
      }
      setNotification({
        message: "An unexpected error occurred",
        type: "fail"
      });
    }
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx("section", { id: "newsletter", className: "bg-front-section-grey py-10", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "grid grid-cols-12 items-end", children: [
    /* @__PURE__ */ jsxs("div", { className: "md:col-span-6 col-span-12", children: [
      /* @__PURE__ */ jsx("div", { className: "title-wrapper mb-3", children: /* @__PURE__ */ jsx("p", { className: "text-front-section-title font-serif font-semibold", children: "Newsletter" }) }),
      /* @__PURE__ */ jsx("div", { className: "description-wrapper", children: /* @__PURE__ */ jsx("p", { className: "text-front-body-big", children: "Subscribe to our newsletter so you can get amazing coupons." }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "md:col-span-6 col-span-12", children: /* @__PURE__ */ jsxs("div", { className: "inner md:pl-10 flex items-center", children: [
      /* @__PURE__ */ jsx("div", { className: "input-wrapper flex-1", children: /* @__PURE__ */ jsx(
        "input",
        {
          placeholder: "Enter your email",
          className: "w-full border-b border-[#5F5F5F] h-full py-4 pl-4",
          onChange: changeHandler,
          type: "email",
          value: email
        }
      ) }),
      /* @__PURE__ */ jsx("div", { className: "button", children: /* @__PURE__ */ jsx(
        Button,
        {
          text: "SUBSCRIBE",
          onClick: clickHandler,
          bigger: true
        }
      ) })
    ] }) })
  ] }) }) }) });
};
export {
  Newsletter as N
};
