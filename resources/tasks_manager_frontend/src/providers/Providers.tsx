"use client";
import { Provider } from "react-redux"
import {store} from "@/store/store";
import { SessionProvider as NextSessionProvider } from 'next-auth/react'
import React, { FunctionComponent, PropsWithChildren } from "react";

export const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
    return <NextSessionProvider><Provider store={store}>{children}</Provider></NextSessionProvider>;
};

