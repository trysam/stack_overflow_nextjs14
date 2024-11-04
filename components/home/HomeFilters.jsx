"use client";
import React from "react";
import { HomePageFilters } from "@/constants/filters";
import { Button } from "@/components/ui/button";

const HomeFilters = () => {
  const active = "frequent";
  return (
    <div className="flex flex-wrap gap-3 ">
      {HomePageFilters.map((filter) => (
        <Button
          key={filter.value}
          onClick={() => {}}
          className={`
          base-medium rounded-md px-6 py-2 capitalize shadow-none
          ${active === filter.value ? "bg-primary-100 text-primary-500" : "background-light800_dark300 text-light-500"}
          `}
        >
          <div>{filter.name}</div>
        </Button>
      ))}
    </div>
  );
};

export default HomeFilters;
