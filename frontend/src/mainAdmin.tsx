import "./index.css";
import "./font.css";
import App from "./App";
import ReactDOM from 'react-dom/client';
import AdminApp from "./routes/AdminApp";
// import { registerAllCustomFormats } from "./quill/quill.setup";
// registerAllCustomFormats()

declare global {
    interface Window {
        __INITIAL_DATA__?: Record<string, any>
    }
}

const initialData = window.__INITIAL_DATA__;


ReactDOM.hydrateRoot( document.getElementById('root') as HTMLElement,
    <App initialData={initialData}>
        <AdminApp />
    </App>
)

delete window.__INITIAL_DATA__