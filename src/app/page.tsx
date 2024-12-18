import React from "react";
import DefaultWrapper from "@/components/wrappers/DefaultWrapper";
import Reports from "../components/pages/Reports";
import AddTransactionButton from "@/components/atoms/AddTransactionButton";

export default function Home() {
  return (
    <DefaultWrapper>
      <div className="p-6">
        <Reports/>
        <AddTransactionButton/>
      </div>
    </DefaultWrapper>
  );
}
