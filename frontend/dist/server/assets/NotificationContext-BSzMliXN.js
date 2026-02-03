import { jsxs, jsx } from "react/jsx-runtime";
import * as React from "react";
import { useState, createContext, useEffect, useContext } from "react";
const SvgClose = (props) => /* @__PURE__ */ React.createElement("svg", { className: "size-6       ", width: "1em", height: "1em", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", ...props }, /* @__PURE__ */ React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M6.04289 16.5418C5.65237 16.9323 5.65237 17.5655 6.04289 17.956C6.43342 18.3465 7.06658 18.3465 7.45711 17.956L11.9987 13.4144L16.5408 17.9565C16.9313 18.347 17.5645 18.347 17.955 17.9565C18.3455 17.566 18.3455 16.9328 17.955 16.5423L13.4129 12.0002L17.955 7.45808C18.3455 7.06756 18.3455 6.43439 17.955 6.04387C17.5645 5.65335 16.9313 5.65335 16.5408 6.04387L11.9987 10.586L7.45711 6.04439C7.06658 5.65386 6.43342 5.65386 6.04289 6.04439C5.65237 6.43491 5.65237 7.06808 6.04289 7.4586L10.5845 12.0002L6.04289 16.5418Z", fill: "currentColor" }));
const NotificationContext = createContext({
  setNotification: () => {
  }
});
const NotificationElement = ({
  message,
  type,
  onClose
}) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 5e3);
    return () => clearTimeout(timer);
  }, []);
  const className = "pl-10 pr-6 py-4 flex gap-x-4 items-center relative rounded shadow-lg " + (type === "fail" ? "bg-front-red text-white" : "bg-front-black text-white");
  return /* @__PURE__ */ jsxs("div", { className, children: [
    message,
    /* @__PURE__ */ jsx(SvgClose, { className: "cursor-pointer", onClick: onClose })
  ] });
};
const NotificationProvider = ({ children }) => {
  const [list, setList] = useState([]);
  const setNotification = ({ message, type }) => {
    setList((prev) => [
      ...prev,
      {
        id: Date.now(),
        message,
        type
      }
    ]);
  };
  const removeNotification = (id) => {
    setList((prev) => prev.filter((n) => n.id !== id));
  };
  return /* @__PURE__ */ jsxs(NotificationContext.Provider, { value: { setNotification }, children: [
    children,
    /* @__PURE__ */ jsx("div", { className: "fixed bottom-8 left-1/2 -translate-x-1/2 z-[999999] flex flex-col gap-3", children: list.map((notif) => /* @__PURE__ */ jsx(
      NotificationElement,
      {
        ...notif,
        onClose: () => removeNotification(notif.id)
      },
      notif.id
    )) })
  ] });
};
const useNotification = () => useContext(NotificationContext);
export {
  NotificationProvider as N,
  useNotification as u
};
