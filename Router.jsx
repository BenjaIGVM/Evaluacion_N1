import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DogTinder from './src/pages/index';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ThemeProvider } from 'next-themes';

import "./src/styles/globals.css"

function RouterApp() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<DogTinder />} />
        </Routes>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default RouterApp;

