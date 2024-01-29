import { ChangeEvent, FormEvent, useState } from "react";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { IngredientKey } from "@/types/ingredient";
import { PostTteokgukResponse } from "@/types/tteokguk";

import useRouter from "@/routes/useRouter";
import { $postTteokguk } from "@/store/tteokguk";
import Button from "@/components/common/Button";
import Header from "@/components/common/Header";
import Ingredient from "@/components/common/Ingredient";
import WishIcon from "@/assets/svg/wish.svg";
import MeterialIcon from "@/assets/svg/material.svg";
import CheckIcon from "@/assets/svg/check.svg";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import {
  INGREDIENT_ICON_BY_KEY,
  INGREDIENT_KEYS,
  INGREDIENT_NAME_BY_KEY,
} from "@/constants/ingredient";

const MAX_CHARACTERS = 100;
const MAX_INGREDIENTS = 5;

const TteokgukCookingPage = () => {
  const router = useRouter();
  const { mutate: createTteokguk } = useAtomValue($postTteokguk);

  const [wish, setWish] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientKey[]>([]);
  const [isPrivate, setIsPrivate] = useState(false);

  const handleCheckboxChange = () => {
    setIsPrivate(!isPrivate);
  };

  const handleTextChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setWish(event.target.value);
  };

  const handleClickIngredient = (name: IngredientKey) => () => {
    setSelectedIngredients((previousSelected) => {
      const isSelected = previousSelected.includes(name);

      if (isSelected) {
        return previousSelected.filter((selectedLabel) => selectedLabel !== name);
      }

      return previousSelected.length < 5 ? [...previousSelected, name] : previousSelected;
    });
  };

  const handleSubmitForm = (event: FormEvent) => {
    event.preventDefault();

    createTteokguk(
      {
        wish,
        ingredients: selectedIngredients,
        access: isPrivate,
      },
      {
        onSuccess: (createdTteokguk: PostTteokgukResponse) => {
          const { tteokgukId } = createdTteokguk;

          router.push(`/tteokguks/${tteokgukId}`);
        },
      },
    );
  };

  return (
    <div>
      <Header hasPreviousPage actionIcon="guide">
        떡국 만들기
      </Header>
      <div className={styles.container}>
        <div className={styles.title}>
          <WishIcon />
          나의 새해 소원
        </div>
        <form onSubmit={handleSubmitForm} className={styles.textareaContainer}>
          <textarea
            onChange={handleTextChange}
            placeholder="이루고 싶은 소원을 입력하세요."
            maxLength={MAX_CHARACTERS}
            className={styles.wisharea}
          />
          <div className={styles.charCount}>
            {wish.length}/{MAX_CHARACTERS}
          </div>
          <div className={styles.titleContainer}>
            <div className={styles.title}>
              <MeterialIcon />
              <span>떡국 재료 추가하기</span>
            </div>
            <div>
              {selectedIngredients.length}/{MAX_INGREDIENTS}
            </div>
          </div>
          <div className={styles.meterialContainer}>
            {INGREDIENT_KEYS.map((key, index) => (
              <Ingredient
                key={`${index}-${key}`}
                IngredientIcon={INGREDIENT_ICON_BY_KEY[key]}
                label={INGREDIENT_NAME_BY_KEY[key]}
                onClick={handleClickIngredient(key)}
                isSelected={selectedIngredients.includes(key)}
              />
            ))}
          </div>
          <label htmlFor="private" className={styles.privateLabel}>
            {isPrivate ? <CheckIcon /> : <NoCheckIcon />}
            비공개로 만들기
          </label>
          <input
            id="private"
            type="checkbox"
            checked={isPrivate}
            onChange={handleCheckboxChange}
            className="a11y-hidden"
          />
          <Button
            disabled={!wish || selectedIngredients.length !== MAX_INGREDIENTS}
            color="primary.45"
            applyColorTo="outline"
          >
            소원 떡국 만들기
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TteokgukCookingPage;

const styles = {
  container: css({
    width: "100%",
    minHeight: "calc(100% - 4.8rem)",
    backgroundColor: "back",
    paddingX: "2.4rem",
  }),
  image: css({
    height: "8.4rem",
    border: "0.1rem solid",
  }),
  titleContainer: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingRight: "0.8rem",
  }),
  title: css({
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
    marginTop: "1.6rem",
    marginBottom: "1rem",
  }),
  textareaContainer: css({
    position: "relative",
    height: "16.9rem",
    paddingBottom: "2rem",
  }),
  wisharea: css({
    width: "100%",
    height: "100%",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
    padding: "1.6rem 1.2rem 0",
    outline: "none",
    fontSize: "1.4rem",
    resize: "none",
  }),
  charCount: css({
    position: "absolute",
    right: "1.2rem",
    bottom: "3rem",
    fontSize: "1.2rem",
    color: "gray.50",
  }),
  meterialContainer: css({
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(7.6rem, 1fr))",
    gap: "1.8rem",
    height: "43.8rem",
    padding: "2.3rem 2.4rem",
    borderRadius: "0.8rem",
    backgroundColor: "primary.20",
  }),
  privateLabel: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "0.8rem",
    marginTop: "3.1rem",
    marginBottom: "1.6rem",
  }),
};
