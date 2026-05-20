import { trackMetaStandard } from "../analytics/metaPixel";

export const WHATSAPP_PHONE = "14372196444";
export const WHATSAPP_MESSAGE =
    "Merhaba, ABD / Kanada'da işletmem var. İngilizce reklam ve online tanıtım için bilgi almak istiyorum.";
const WHATSAPP_HOST = ["wa", "me"].join(".");

export const getWhatsAppUrl = () =>
    `https://${WHATSAPP_HOST}/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

export const openWhatsApp = (label) => {
    trackMetaStandard("Contact", {
        label,
        contact_method: "whatsapp",
    });

    window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
};
