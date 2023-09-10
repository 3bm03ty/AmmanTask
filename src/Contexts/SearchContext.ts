import React, { Dispatch, SetStateAction } from "react";

export const SearchContext = React.createContext<{
    searchValue: string;
    setSearchValue: Dispatch<SetStateAction<string>>;
  }>({
    searchValue: "",
    setSearchValue: () => {}, // Provide a default function
  });