import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { getUser, GetUserDataType } from 'api/my-page';
import * as S from './MyProfile.styled';

interface MyProfileContextType {
  userInfo: GetUserDataType;
  modifyMode: boolean;
  setModifyMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const userInitialState = {
  email: '',
  nickname: '',
  profileImage: '',
};

const contextInitialState = {
  userInfo: userInitialState,
  modifyMode: false,
  setModifyMode: () => {},
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
    modifyMode,
    setModifyMode,
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
  const { userInfo } = useContext(userContext);
  const { profileImage } = userInfo;
  return (
    <S.ProfileImageArea>
      <S.ProfileImageDiv>
        <S.ProfileImage src={profileImage} />
      </S.ProfileImageDiv>
    </S.ProfileImageArea>
  );
};

const ProfileInfoArea = () => {
  const { userInfo } = useContext(userContext);
  const { email, nickname } = userInfo;
  return (
    <S.ProfileInfoArea>
      <ProfileInfoBox label="이메일" id="email" val={email} />
      <ProfileInfoBox label="닉네임" id="nickname" val={nickname} />
    </S.ProfileInfoArea>
  );
};

interface ProfileInfoBoxProps {
  id: string;
  label: string;
  val: string;
}

const ProfileInfoBox = ({ id, label, val }: ProfileInfoBoxProps) => {
  const { modifyMode } = useContext(userContext);

  return (
    <S.ProfileInfoBox>
      <S.ProfileInfoLabel htmlFor={id}>{label}</S.ProfileInfoLabel>
      {modifyMode && <S.ProfileInfoInput id={id} value={val} />}
      {!modifyMode && <S.ProfileInfoP>{val}</S.ProfileInfoP>}
    </S.ProfileInfoBox>
  );
};

const ProfileButtonArea = () => {
  const { modifyMode, setModifyMode } = useContext(userContext);

  const toggleModifyMode = useCallback(() => {
    setModifyMode(!modifyMode);
  }, [modifyMode, setModifyMode]);

  return (
    <S.ProfileButtonArea>
      {!modifyMode && (
        <S.ProfileButton onClick={toggleModifyMode}>수정</S.ProfileButton>
      )}
      {modifyMode && (
        <>
          <S.ProfileButton>확인</S.ProfileButton>
          <S.ProfileButton onClick={toggleModifyMode} blank>
            취소
          </S.ProfileButton>
        </>
      )}
    </S.ProfileButtonArea>
  );
};

export default MyProfile;
