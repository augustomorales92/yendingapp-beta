"use client";
import React, { useEffect } from "react";
import { useFormStatus } from "react-dom";
import toast from "react-hot-toast";
import Spinner from "@/components/spinner";

export function CustomButton({
  text,
  toastMessage,
}: {
  text: string;
  toastMessage?: string;
}) {
  const { pending } = useFormStatus();
  useEffect(() => {
    if (pending) {
      toast.loading(toastMessage || "Loading...");
    }
  }, [pending]);
  return (
    <button className="btn-secondary-flex">
      <span>{pending ? <Spinner /> : text}</span>
    </button>
  );
}
