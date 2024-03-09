import React, { MouseEvent, useRef, useState } from "react";
import * as S from "./CreateFolder.styled";

interface CreateFolderProps {
  onClickCreateBookmark: (bookmark: string) => void;
}

const CreateFolder = ({ onClickCreateBookmark }: CreateFolderProps) => {
  const [modifyMode, setModifyMode] = useState<boolean>(false);
  const titleRef = useRef<HTMLInputElement>(null);

  const createBookmark = () => {
    console.log(titleRef.current?.value);
    if (titleRef.current?.value! !== "") {
      onClickCreateBookmark(titleRef.current?.value!);
      setModifyMode(false);
    }
  };

  const cancelBookmarkTitle = () => {
    if (titleRef.current) titleRef.current.value = "";
    setModifyMode(false);
  };

  const onClickSetModifyMode = (e: MouseEvent) => {
    e.stopPropagation();
    setModifyMode(!modifyMode);
  };

  return (
    <>
      {!modifyMode && (
        <S.CreateBookmarkDiv
          modifyMode={modifyMode}
          onClick={onClickSetModifyMode}
        >
          <S.CreateBookmarkParagraph>+ 북마크 추가</S.CreateBookmarkParagraph>
        </S.CreateBookmarkDiv>
      )}
      {modifyMode && (
        <S.CreateBookmarkDiv modifyMode={modifyMode}>
          <S.CreateBookmarkInput
            placeholder="제목을 입력해주세요"
            ref={titleRef}
          />
          <S.CreateBookmarkButtonDiv>
            <S.CreatBookmarkButton onClick={createBookmark}>
              확인
            </S.CreatBookmarkButton>
            <S.CreatBookmarkButton onClick={cancelBookmarkTitle}>
              취소
            </S.CreatBookmarkButton>
          </S.CreateBookmarkButtonDiv>
        </S.CreateBookmarkDiv>
      )}
    </>
  );
};

export default CreateFolder;
