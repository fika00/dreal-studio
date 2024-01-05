import { BloomEffect, BlendFunction } from "postprocessing";
import { wrapEffect } from "@react-three/postprocessing";
import { SmokyBloom } from "./SmokyBloom.js";

export const AtmosphericBloom = wrapEffect(SmokyBloom, {
  blendFunction: BlendFunction.ADD,
});
