import { ChangeEvent, FormEvent, useState } from "react";

import { useOverlay } from "@toss/use-overlay";
import { useAtomValue } from "jotai";

import { css } from "@styled-system/css";

import CheerSuccessModal from "./CheerSuccessModal";

import Button from "@/components/common/Button";
import Modal from "@/components/common/modal/Modal";
import CheckIcon from "@/assets/svg/check.svg";
import NoCheckIcon from "@/assets/svg/no-check.svg";
import { $postIngredientToOthersTteokguk, $selectedIngredient } from "@/store/ingredient";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tteokgukId: number;
}

const MAX_CHARACTER = 100;

const CreateCheerMessageModal = ({ isOpen, onClose, tteokgukId }: Props) => {
  const cheerSuccessOverlay = useOverlay();
  const { mutate: postIngredient } = useAtomValue($postIngredientToOthersTteokguk);
  const selectedIngredient = useAtomValue($selectedIngredient);
  const [message, setMessage] = useState("");
  const [isAnonymous, setIsAnonymous] = useState(false);

  const handleChangeTextarea = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const message = event.target.value;

    setMessage(message);
  };

  const handleChangeCheckbox = () => {
    setIsAnonymous(!isAnonymous);
  };

  const handleSubmitCheerMessage = (event: FormEvent) => {
    event.preventDefault();

    if (!selectedIngredient || message.length === 0) return;

    postIngredient(
      {
        tteokgukId,
        supportIngredient: selectedIngredient,
        message,
        access: !isAnonymous,
      },
      {
        onSuccess: ({ rewardIngredient, rewardQuantity }) => {
          cheerSuccessOverlay.open(({ isOpen, close: handleCloseCheerSuccessModal }) => (
            <CheerSuccessModal
              isOpen={isOpen}
              onClose={() => {
                handleCloseCheerSuccessModal();
                onClose();
              }}
              rewardIngredient={rewardIngredient}
              rewardQuantity={rewardQuantity}
            />
          ));
        },
      },
    );
  };

  return (
    isOpen && (
      <Modal className={styles.container}>
        <Modal.Header hasCloseButton onClose={onClose}>
          응원 메시지 남기기
        </Modal.Header>
        <Modal.Body className={styles.bodyContainer}>
          <form onSubmit={handleSubmitCheerMessage}>
            <textarea
              placeholder="새해 복 많이 받으세요."
              maxLength={MAX_CHARACTER}
              onChange={handleChangeTextarea}
              className={styles.textarea}
            />
            <div className={styles.countChar}>
              {message.length}/{MAX_CHARACTER}
            </div>
            <label htmlFor="anonymous" className={styles.anonymousLabel}>
              {isAnonymous ? <CheckIcon /> : <NoCheckIcon />}
              익명으로 선물하기
            </label>
            <input
              id="anonymous"
              type="checkbox"
              onChange={handleChangeCheckbox}
              className="a11y-hidden"
            />
            <Button color="primary.100" applyColorTo="background">
              보내기
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    )
  );
};

export default CreateCheerMessageModal;

const styles = {
  container: css({
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  }),
  bodyContainer: css({
    position: "relative",
    width: "100%",
  }),
  textarea: css({
    width: "100%",
    height: "21.6rem",
    resize: "none",
    borderWidth: "0.1rem",
    borderColor: "primary.45",
    borderRadius: "0.8rem",
    padding: "1.6rem 1.2rem",
    marginTop: "1.6rem",
    marginBottom: "3.6rem",
  }),
  countChar: css({
    position: "absolute",
    right: "1.2rem",
    top: "20rem",
    color: "gray.50",
  }),
  anonymousLabel: css({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.8rem",
    marginBottom: "1.2rem",
    cursor: "pointer",
  }),
};
