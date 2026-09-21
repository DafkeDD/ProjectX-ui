"use client";
import { Icon } from "@projectx/ui";
import { OtpVerification } from "@projectx/ui/motion";

export default function Demo() {
  return (
    <OtpVerification
      variant="orbit"
      demoCode="5656"
      autoPlay
      loop
      action
      icon={<Icon name="lock" size={16} />}
      resendAfter={39}
      onResend={() => {}}
      texts={{
        title: (
          <>
            Verifieer je <span className="pxui-otpv-accent">code</span>
          </>
        ),
        description: "Vul de 4-cijferige beveiligingscode in die we naar je toestel stuurden.",
        successTitle: (
          <>
            Gelukt <span style={{ color: "var(--green)" }}>—</span> bevestigd
          </>
        ),
        successDescription: "Je beveiligingscode is bevestigd.",
        resendPrompt: "Geen code ontvangen?",
        action: "Bevestigen",
        actionBusy: "Code controleren…",
        actionDone: "Geverifieerd en beveiligd",
      }}
    />
  );
}
