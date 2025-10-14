import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Routes } from './Routes/Routes'
import { Toaster } from 'react-hot-toast'
import { RouterProvider } from 'react-router'
import './index.css'
import { ConfigProvider } from 'antd'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider
      theme={{
        components: {
          Pagination: {
            itemBg: 'rgb(255,255,255)',
            itemActiveBg: 'rgb(214,40,40)',
            colorPrimary: 'rgb(255,255,255)',
            colorPrimaryHover: 'rgb(255,255,255)',
            colorPrimaryBorder: 'rgb(214,40,40)',
          },
          Input: {
            controlHeight: 48,
            inputFontSize: 16,
            borderRadius: 2
          },
          Select: {
            controlHeight: 48,
            optionHeight: 34,
            fontSize: 16
          }
        },
      }}
    >
      <Toaster position="top-center" toastOptions={{ duration: 1500 }} />
      <RouterProvider router={Routes} />
    </ConfigProvider>
  </StrictMode>,
)
