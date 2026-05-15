"use client";

import { Provider } from "react-redux";
import { store } from "../redux/store";
import { Toaster } from "@/src/components/ui/sonner";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      {children}
      <Toaster /> 
    </Provider>
  );
}