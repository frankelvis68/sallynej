import React from "react";
import { Container } from "@/components/common/Container";

export default function Loading() {
  return (
    <div className="py-20 bg-[#f7f9fc]">
      <Container className="flex flex-col gap-6 animate-pulse">
        <div className="h-8 bg-[#e2e8f0] rounded-lg w-1/3" />
        <div className="h-4 bg-[#e2e8f0] rounded w-2/3" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="h-72 bg-[#e2e8f0] rounded-xl" />
          <div className="h-72 bg-[#e2e8f0] rounded-xl" />
          <div className="h-72 bg-[#e2e8f0] rounded-xl" />
        </div>
      </Container>
    </div>
  );
}
