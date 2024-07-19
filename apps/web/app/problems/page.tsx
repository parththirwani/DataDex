"use client"
import { useState } from "react";
import { Problems}  from "../../components/Problems";
import { McqProblems } from "../../components/McqProblems";
import { Button } from "@repo/ui/button";

export default function Page() {
  
  return (
    <main>
      
            <Problems />
      
     
    </main>
  );
}

export const dynamic = "force-dynamic"

