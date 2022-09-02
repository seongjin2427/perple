import React, {
  ChangeEvent,
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { getUser, GetUserDataType, modifyUser } from 'api/my-page';
import * as S from './MyProfile.styled';

interface MyProfileContextType {
  userInfo: GetUserDataType;
  setUserInfo: React.Dispatch<React.SetStateAction<GetUserDataType>>;
  modifyMode: boolean;
  setModifyMode: React.Dispatch<React.SetStateAction<boolean>>;
  getUserInfo: () => void;
}

const userInitialState = {
  email: '',
  nickname: '',
  profileImage: '',
};

const contextInitialState = {
  userInfo: userInitialState,
  setUserInfo: () => {},
  modifyMode: false,
  setModifyMode: () => {},
  getUserInfo: () => {},
};

const userContext = createContext<MyProfileContextType>(contextInitialState);

const UserProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = useState<GetUserDataType>(userInitialState);
  const [modifyMode, setModifyMode] = useState<boolean>(false);

  const getUserInfo = async () => {
    const result = await getUser();
    if (result) setUserInfo(result);
  };

  const contextValue = {
    userInfo,
    setUserInfo,
    modifyMode,
    setModifyMode,
    getUserInfo,
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <userContext.Provider value={contextValue}>{children}</userContext.Provider>
  );
};

const MyProfile = () => {
  return (
    <UserProvider>
      <S.Container>
        <S.ProfileArea>
          <ProfileImageArea />
          <ProfileInfoArea />
        </S.ProfileArea>
        <ProfileButtonArea />
      </S.Container>
    </UserProvider>
  );
};

const ProfileImageArea = () => {
  const fileRef = useRef<HTMLInputElement>(null);
  const { userInfo, setUserInfo, modifyMode } = useContext(userContext);
  const { profileImage } = userInfo;

  const onClickInputImage = useCallback(() => {
    modifyMode && fileRef.current!.click();
  }, [modifyMode]);

  const onChangeSaveImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files![0];
      const reader = new FileReader();
      reader.onload = (e) => {
        setUserInfo((prev) => ({
          ...prev,
          profileImage: e.target!.result?.toString()!,
        }));
      };
      reader.readAsDataURL(file);
    },
    [setUserInfo],
  );

  return (
    <S.ProfileImageArea>
      <S.ProfileImageDiv>
        {profileImage && (
          <S.ProfileImage
            title="이미지를 클릭하여 프로필 사진을 변경해보세요!"
            src={profileImage}
            onClick={onClickInputImage}
          />
        )}
        <input hidden onChange={onChangeSaveImage} type="file" ref={fileRef} />
      </S.ProfileImageDiv>
    </S.ProfileImageArea>
  );
};

const ProfileInfoArea = () => {
  return (
    <S.ProfileInfoArea>
      <ProfileInfoBox label="이메일" id="email" />
      <ProfileInfoBox label="닉네임" id="nickname" />
    </S.ProfileInfoArea>
  );
};

interface ProfileInfoBoxProps {
  id: string;
  label: string;
}

const ProfileInfoBox = ({ id, label }: ProfileInfoBoxProps) => {
  const { modifyMode, userInfo, setUserInfo } = useContext(userContext);

  const onChangeUserInfo = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (id === 'nickname')
        setUserInfo((prev) => ({ ...prev, [id]: e.target!.value }));
    },
    [id, setUserInfo],
  );

  return (
    <S.ProfileInfoBox>
      <S.ProfileInfoLabel htmlFor={id}>{label}</S.ProfileInfoLabel>
      {modifyMode && (
        <S.ProfileInfoInput
          onChange={onChangeUserInfo}
          id={id}
          value={userInfo[id]}
          disabled={id === 'email'}
        />
      )}
      {!modifyMode && <S.ProfileInfoP>{userInfo[id]}</S.ProfileInfoP>}
    </S.ProfileInfoBox>
  );
};

const ProfileButtonArea = () => {
  const { modifyMode, setModifyMode, userInfo, getUserInfo } =
    useContext(userContext);

  const toggleModifyMode = useCallback(() => {
    setModifyMode(!modifyMode);
    getUserInfo();
  }, [modifyMode, setModifyMode, getUserInfo]);

  const confirmModifiedUserInfo = useCallback(async () => {
    await modifyUser(userInfo);
    setModifyMode(!modifyMode);
  }, [modifyMode, setModifyMode, userInfo]);

  return (
    <S.ProfileButtonArea>
      {!modifyMode && (
        <S.ProfileButton onClick={toggleModifyMode}>수정</S.ProfileButton>
      )}
      {modifyMode && (
        <>
          <S.ProfileButton onClick={confirmModifiedUserInfo}>
            확인
          </S.ProfileButton>
          <S.ProfileButton onClick={toggleModifyMode} blank>
            취소
          </S.ProfileButton>
        </>
      )}
    </S.ProfileButtonArea>
  );
};

export default MyProfile;
