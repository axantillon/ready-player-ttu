'use client'
import { SessionProvider } from 'next-auth/react';
import React, { FC } from 'react'

interface authProviderProps {
  children: React.ReactNode;
}

const AuthProvider: FC<authProviderProps> = ({ children }) => {
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}

export default AuthProvider;