import { atomWithMutation } from "jotai-tanstack-query";

import { postTteokguk } from "@/apis/tteokguk";

import { PostTteokgukRequest } from "@/types/tteokguk";

export const $postTteokguk = atomWithMutation(() => {
  return {
    mutationFn: (tteokguk: PostTteokgukRequest) => postTteokguk(tteokguk),
  };
});