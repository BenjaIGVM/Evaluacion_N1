
import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter } from "react-router-dom";
import RouterApp from "../Router";
import "./src/styles/globals.css"

import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from 'next-themes'


class MyApp extends App {


    render() {
        const queryClient = new QueryClient();
        const { Component, pageProps } = this.props;

        return (
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <Head>
                        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                        <title>Tinder Dog</title>
                    </Head>
                    <Component {...pageProps} />
                </ThemeProvider>
            </QueryClientProvider>
        );
    }
}

export default MyApp;



