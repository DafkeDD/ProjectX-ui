"use client";
import { OtpVerification } from "@projectx/ui/motion";

export default function Demo() {
  return <OtpVerification demoCode="4545" autoPlay loop onResend={() => {}} />;
}
