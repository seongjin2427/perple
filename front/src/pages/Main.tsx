import React from 'react';

import MainLayout from 'layouts/MainLayout';
import YoutubeList from 'components/shared/YoutubeList';
import { useSelector } from 'react-redux';
import { RootState } from 'store/store';
import { useParams } from 'react-router-dom';

const Main = () => {
  const title = useSelector(({ global }: RootState) => global.searchWord);
  const { search } = useParams();

  return (
    <MainLayout>
      <YoutubeList title={title || search || ''} />
    </MainLayout>
  );
};

export default Main;
