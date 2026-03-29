import { Suspense } from "react";
import GeneratorForm from "@/components/GeneratorForm";

export default function CreatePage() {
  return (
    <Suspense>
      <GeneratorForm />
    </Suspense>
  );
}
