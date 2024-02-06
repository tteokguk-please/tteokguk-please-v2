import { Fragment } from "react";

import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import { Link } from "@/routes/Link";
import { $getMyDetails, $getRandomUserDetails } from "@/store/user";
import { INGREDIENT_ICON_BY_KEY } from "@/constants/ingredient";
import Header from "@/components/common/Header";
import IconButton from "@/components/common/IconButton";
import TteokgukList from "@/components/common/TteokgukList";
import IngredientList from "@/components/Mypage/IngredientList";
import VisitIcon from "@/assets/svg/visit.svg";
import ActivityIcon from "@/assets/svg/activity.svg";
import useRouter from "@/routes/useRouter";

const MyPage = () => {
  const router = useRouter();
  const { data: myDetails } = useAtomValue($getMyDetails);
  const { nickname, primaryIngredient, tteokguks, items: ingredients } = myDetails;
  const { refetch: refetchRandomUserDetails } = useAtomValue($getRandomUserDetails);
  const IngredientIcon = INGREDIENT_ICON_BY_KEY[40][primaryIngredient];

  const handleClickRandomVisitButton = async () => {
    try {
      const { data: randomUserDetails } = await refetchRandomUserDetails();

      if (randomUserDetails) {
        router.push(`/users/${randomUserDetails.id}`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Fragment>
      <Header showBackButton actionIcon="guide">
        마이페이지
      </Header>
      <div className={styles.container}>
        <div className={styles.userInfo}>
          <div>{nickname}님</div>
          <div className={styles.uniqueIngredient}>
            고유재료
            <div className={styles.ingredientIcon}>
              <IngredientIcon />
            </div>
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <IconButton
            onClick={handleClickRandomVisitButton}
            color="primary.45"
            applyColorTo="outline"
          >
            <IconButton.Icon>
              <VisitIcon />
            </IconButton.Icon>
            랜덤 방문
          </IconButton>
          <Link to="/my-page/activity" className={styles.full}>
            <IconButton color="primary.45" applyColorTo="outline">
              <IconButton.Icon>
                <ActivityIcon />
              </IconButton.Icon>
              활동 내역
            </IconButton>
          </Link>
        </div>
        <div>
          <div className={styles.wishTteokgukTitle}>
            <div>소원 떡국 리스트</div>
            <Link to="/tteokguk/create" className={styles.wishTteokgukLink}>
              <button>소원 떡국 만들기</button>
            </Link>
          </div>
          <TteokgukList tteokguks={tteokguks} />
        </div>
        <div>
          <div className={styles.wishTteokgukTitle}>
            <div>보유중인 떡국 재료</div>
          </div>
          <IngredientList ingredients={ingredients} uniqueIngredientKey={primaryIngredient} />
        </div>
        <div className={styles.accountContainer}>
          <button>로그아웃</button>
          <button>탈퇴하기</button>
        </div>
      </div>
    </Fragment>
  );
};

export default MyPage;

const styles = {
  container: css({
    height: "calc(100% - 5.6rem)",
    paddingX: "2.4rem",
    marginBottom: "0.8rem",
  }),
  userInfo: css({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "8.4rem",
    fontWeight: 700,
    borderRadius: "0.8rem",
    backgroundColor: "secondary.100",
    paddingX: "1.6rem",
    marginBottom: "1rem",
  }),
  uniqueIngredient: css({
    display: "flex",
    alignItems: "center",
  }),
  ingredientIcon: css({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "5.2rem",
    height: "5.2rem",
    borderRadius: "50%",
    backgroundColor: "secondary.50",
    marginLeft: "1rem",
  }),
  buttonContainer: css({
    display: "flex",
    gap: "0.8rem",
  }),
  wishTteokgukTitle: css({
    display: "flex",
    justifyContent: "space-between",
    fontWeight: 700,
    marginTop: "3.2rem",
  }),
  wishTteokgukLink: css({
    fontSize: "1.4rem",
    fontWeight: 400,
    borderRadius: "0.4rem",
    backgroundColor: "primary.20",
    padding: "0.45rem 0.8rem",
  }),
  accountContainer: css({
    display: "flex",
    justifyContent: "space-around",
  }),
  full: css({
    width: "100%",
  }),
};
