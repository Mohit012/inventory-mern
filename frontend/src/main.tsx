import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConfigProvider } from 'antd';
import App from './App.tsx';
import { persistor, store } from './redux/store.ts';
import './index.css';
import { Toaster } from 'sonner';

const antdTheme = {
  token: {
    colorPrimary: '#3B82F6', // var(--primary-color)
    colorSuccess: '#10B981', // var(--accent-success)
    colorWarning: '#F59E0B', // var(--accent-warning)
    colorError: '#EF4444',   // var(--accent-danger)
    colorInfo: '#3B82F6',    // Using primary for info as well
    colorTextBase: '#1F2937', // var(--neutral-text-primary)
    colorBgBase: '#F3F4F6',   // var(--neutral-bg-main) - Base background for the app
    fontFamily: "'Inter', 'Nunito Sans', sans-serif",
    borderRadius: 6,
    // Background color for container components like Card, Modal, Popover
    colorBgContainer: '#FFFFFF', // var(--neutral-bg-card)
    colorBorder: '#D1D5DB',      // var(--neutral-border)
    colorBorderSecondary: '#E5E7EB', // var(--neutral-border-light) - for lighter borders like table internal lines
  },
  components: {
    Button: {
      // Example: control default padding
      // controlHeight: 32, // Default: 32
      // controlHeightLG: 40, // Default: 40
      // controlHeightSM: 24, // Default: 24
      // defaultBorderColor: '#D1D5DB', // var(--neutral-border)
      // defaultGhostColor: '#1F2937', // var(--neutral-text-primary) for ghost buttons
    },
    Card: {
      colorBgContainer: '#FFFFFF', // var(--neutral-bg-card)
      paddingLG: 24, // Default padding for large cards
    },
    Modal: {
      colorBgElevated: '#FFFFFF', // var(--neutral-bg-card) - Modals use elevated background
    },
    Table: {
      colorBgContainer: '#FFFFFF', // var(--neutral-bg-card)
      headerBg: '#F9FAFB',       // var(--neutral-bg-card-alt) for table header
      borderColor: '#E5E7EB',     // var(--neutral-border-light) for table cell borders
    },
    Layout: { // For AntD Layout component
        headerBg: '#FFFFFF', // Example: if header should be white
        siderBg: '#FFFFFF', // Example: if sider should be white
    },
    Input: {
      colorBgContainer: '#FFFFFF', // var(--neutral-bg-card)
    },
    Select: {
      colorBgContainer: '#FFFFFF', // var(--neutral-bg-card)
    }
    // ... other component specific overrides
  },
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ConfigProvider theme={antdTheme}>
          <App />
          <Toaster
            duration={2000}
            toastOptions={{
              style: {
                // Using a neutral dark background for general toasts, specific types can override
                background: '#1F2937', // var(--neutral-text-primary)
                color: '#FFFFFF',      // var(--neutral-bg-card)
                fontWeight: 500,       // Medium weight
                padding: '1rem',
                borderRadius: '6px', // Consistent with antdTheme.token.borderRadius
              },
              // Example for specific toast types if Sonner supports it or if you use toast.success directly with styles
              // success: { style: { background: '#10B981', color: '#fff' } },
              // error: { style: { background: '#EF4444', color: '#fff' } },
            }}
          />
        </ConfigProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
