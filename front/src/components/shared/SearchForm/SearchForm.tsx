import React, { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getSearchWord } from 'store/globalSlice';
import * as S from './SearchForm.styled';

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const searchWord = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchWord.current?.value) {
      dispatch(getSearchWord(searchWord.current?.value));
      navigate(`/search/${searchWord.current?.value}`);
      searchWord.current!.value = '';
    }
  };

  return (
    <S.SearchForm onSubmit={onSubmit}>
      <S.SearchInput name="searchWord" ref={searchWord} />
      <S.SearchButton>검색</S.SearchButton>
    </S.SearchForm>
  );
};

export default SearchForm;
