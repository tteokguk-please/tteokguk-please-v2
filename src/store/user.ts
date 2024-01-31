import { atomWithSuspenseQuery } from "jotai-tanstack-query";

import { getMyDetails, getUserDetails } from "@/apis/user";

import { atomFamilyWithSuspenseQuery } from "@/utils/jotai";

export const $getMyDetails = atomWithSuspenseQuery(() => ({
  queryKey: ["myDetails"],
  queryFn: getMyDetails,
}));

export const $getUserDetail = atomFamilyWithSuspenseQuery("users", (id: number) => {
  return getUserDetails(id);
});