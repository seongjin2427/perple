import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { RootState } from 'store/store';
import MainLayout from 'layouts/MainLayout';
import SearchedYoutube from 'components/shared/SearchedYoutube';

const SearchPage = () => {
  const title = useSelector(({ global }: RootState) => global.searchWord);
  const { search } = useParams();

  return (
    <MainLayout>
      <SearchedYoutube title={title || search || '없음'} />
    </MainLayout>
  );
};

export default SearchPage;
