import type { ResolvedRegister } from "abitype";
import { z } from "zod";

export type BytesType = ResolvedRegister["bytesType"]["outputs"];

export const Signature = z.string().transform((val, ctx) => {
  const regex = /^0x[a-fA-F0-9]+$/;

  if (!regex.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid Signature ${val}`,
    });
  }

  return val as BytesType;
});

export const Calldata = z.string().transform((val, ctx) => {
  const regex = /^0x[a-fA-F0-9]+$/;

  if (!regex.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid calldata ${val}`,
    });
  }

  return val as BytesType;
});

export const TransactionHash = z.string().transform((val, ctx) => {
  const regex = /^0x[a-fA-F0-9]{64}$/;

  if (!regex.test(val)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Invalid Hash ${val}`,
    });
  }

  return val as BytesType;
});
