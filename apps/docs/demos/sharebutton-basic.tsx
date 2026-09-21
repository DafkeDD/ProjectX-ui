"use client";
import { Icon } from "@projectx/ui";
import { ShareButton } from "@projectx/ui/motion";

export default function Demo() {
  return (
    <ShareButton
      url="https://projectx.ui/componenten/share-button"
      channels={[
        { id: "mail", label: "E-mail", href: "mailto:?body={url}", tone: "var(--red)" },
        { id: "chat", label: "Teams", icon: <Icon name="send" size={17} />, tone: "var(--blue)" },
        { id: "qr", label: "QR-code", icon: <Icon name="scan" size={17} />, tone: "var(--violet)" },
        { id: "link", label: "Link kopiëren", tone: "var(--accent)" },
      ]}
    />
  );
}
