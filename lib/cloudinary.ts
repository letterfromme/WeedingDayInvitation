const CLOUD =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "ditifn5y3";

export const LAYERS = {
  bg: "weeding-card/bg",
  flowerTl: "weeding-card/flower-tl",
  flowerTc: "weeding-card/flower-tc",
  flowerTr: "weeding-card/flower-tr",
  goldTr: "weeding-card/gold-tr",
  goldBl: "weeding-card/gold-bl",
  flowerBc: "weeding-card/flower-bc",
  flowerBb: "weeding-card/flower-bb",
  flowerBr: "weeding-card/flower-br",
  bride1: "weeding-card/bride-1",
  bride2: "weeding-card/bride-2",
  bride3: "weeding-card/bride-3",
  song: "weeding-card/song",
} as const;

export function cld(publicId: string, extra = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${extra}/${publicId}`;
}

export function cldLayer(publicId: string) {
  return cld(publicId, "f_auto,q_auto,e_make_transparent:30,co_black");
}

export function cldBg(publicId: string) {
  return cld(publicId, "f_auto,q_auto,e_brightness:20,e_saturation:-8");
}

export function cldPhoto(publicId: string, extra = "f_auto,q_auto,c_fill,g_auto") {
  return cld(publicId, extra);
}

export function cldAudio(publicId: string) {
  return `https://res.cloudinary.com/${CLOUD}/video/upload/${publicId}`;
}
