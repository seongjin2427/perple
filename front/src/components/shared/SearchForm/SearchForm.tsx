import React, { FormEvent, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getSearchWord } from 'store/globalSlice';
import * as S from './SearchForm.styled';

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const word = useRef<HTMLInputElement>(null);

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(getSearchWord(word.current?.value || ''));
    navigate(`/search/${word.current?.value}`);
  };

  return (
    <S.SearchForm onSubmit={onSubmit}>
      <S.SearchInput name="search" ref={word} />
      <S.SearchButton>검색</S.SearchButton>
    </S.SearchForm>
  );
};

export default SearchForm;
