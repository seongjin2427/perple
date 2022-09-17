import React from 'react';

import MainLayout from 'layouts/MainLayout';
import BookmarkList from 'components/shared/BookmarkList/BookmarkList';

const BookmarkPage = () => {
  return (
    <MainLayout>
      <BookmarkList />
    </MainLayout>
  );
};

export default BookmarkPage;
