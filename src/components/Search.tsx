import React, { useRef, useState, useCallback, useEffect } from "react";
import {useDebounce} from '../hooks/debounce';
import { setSearch } from "../store/filterFilmSlice/filterFilmSlice";
import { useAppDispatch } from "../store";

const Search: React.FC = () => {
  const [value, setValue] = useState<string>('deadpool')
  const inputRef = useRef<HTMLInputElement>(null);
  const debounced = useDebounce(value);
  const dispatch = useAppDispatch()

  if(value === '123') {
    throw new Error('BOOOOOOOOM!')
  }

  const onClickClear = () => {
    dispatch(setSearch(''))
    setValue('');
    inputRef.current?.focus();
  };
  
  useEffect(() => {
    dispatch(setSearch(debounced))
  }, [debounced])

  const onChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className='search'>
      <svg
        className='search-icon'
        enableBackground="new 0 0 32 32"
        id="EditableLine"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          cx="14"
          cy="14"
          fill="none"
          id="XMLID_42_"
          r="9"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
        />
        <line
          fill="none"
          id="XMLID_44_"
          stroke="#000000"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit="10"
          strokeWidth="2"
          x1="27"
          x2="20.366"
          y1="27"
          y2="20.366"
        />
      </svg>
      <input
        ref={inputRef}
        value={value}
        onChange={onChangeInput}
        className='search-input'
        placeholder="Поиск фильма..."
      />
      {value && (
        <svg
          onClick={onClickClear}
          className='search-clearIcon'
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
        </svg>
      )}
    </div>
  );
}

export default Search;