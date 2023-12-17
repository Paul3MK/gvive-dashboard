"use client"

import { Content, Theme } from "@carbon/react"
import React from "react"
import Login from "@/components/Auth/login"
import { useAuthStore } from "@/state/mainStore"
import useStore from "@/state/useStore"
import { InlineLoading } from "@carbon/react"
import DashboardHeader from "@/components/DashboardHeader/DashboardHeader"
import { redirect } from "next/navigation"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


export function Providers({ children }: { children: any }) {
  const loggedIn = useStore(useAuthStore, state => state.loggedIn)
  const loggedOut = useStore(useAuthStore, state => state.loggedOut)

  const queryClient = new QueryClient();
  
  if (loggedIn && !loggedOut) {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Theme theme="g100">
            <DashboardHeader />
          </Theme>
          <Content>{children}</Content>
        </div>
      </QueryClientProvider>
    )
  } else if (!loggedIn && loggedOut) {
    return (
      <Login/>
    )
  } else {
    // redirect("/login")
    return (
      <div>
        <Theme theme="g100">
          <DashboardHeader />
        </Theme>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh", width: "100vw" }}>
          <InlineLoading status="active" description="Loading data..." style={{ justifyContent: "center" }} />
        </div>
      </div>
    )
  }
}
