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
} as const;

export function cld(publicId: string, extra = "f_auto,q_auto") {
  return `https://res.cloudinary.com/${CLOUD}/image/upload/${extra}/${publicId}`;
}

export function cldLayer(publicId: string) {
  return cld(publicId, "f_auto,q_auto,e_make_transparent:30,co_black");
}
