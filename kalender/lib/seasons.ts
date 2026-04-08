export type Season = "summer" | "winter" | "autumn" | "spring";

export const seasonTokens: Record<
  Season,
  {
    skyTop: string;
    skyMid: string;
    skyBottom: string;
    hillFront: string;
    hillMid: string;
    hillBack: string;
    sunGlow: string;
  }
> = {
  summer: {
    skyTop: "#E8475F",
    skyMid: "#F07840",
    skyBottom: "#F5A623",
    hillBack: "#7B4A18",
    hillMid: "#9B5E28",
    hillFront: "#B8722E",
    sunGlow: "#FFE000",
  },
  winter: {
    skyTop: "#6FA8DC",
    skyMid: "#8FBFE6",
    skyBottom: "#B0D0F0",
    hillFront: "#6B7A8D",
    hillMid: "#5C6775",
    hillBack: "#4A5568",
    sunGlow: "#FFFDE7",
  },
  autumn: {
    skyTop: "#D4704A",
    skyMid: "#E08B44",
    skyBottom: "#F5C842",
    hillFront: "#A0522D",
    hillMid: "#8C4827",
    hillBack: "#7B3F1A",
    sunGlow: "#FFE082",
  },
  spring: {
    skyTop: "#5BA5C8",
    skyMid: "#7CC0BA",
    skyBottom: "#A8D8A8",
    hillFront: "#6B8E5A",
    hillMid: "#5C8450",
    hillBack: "#4A7A3A",
    sunGlow: "#FFF59D",
  },
};
