import ShoeBoard from "@/components/Board/ShoeBoard";
import { Suspense } from "react";

export default function ShoePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ShoeBoard />
    </Suspense>
  );
}
