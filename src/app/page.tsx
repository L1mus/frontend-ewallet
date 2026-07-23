"use client";

import Input from "@/components/ui/Input";

export default function Home() {
  return (
    <div className="w-50 flex flex-col gap-2">
        <Input label="search" inputName="Search" icon="/globe.svg"/>
    </div>
  );
}
