import React, { Dispatch, SetStateAction } from "react";
type RecentlyViewedContextType = {
    recentlyViewedMovies: any[]; // Replace 'any[]' with the actual type of your movies
    setRecentlyViewedMovies: Dispatch<SetStateAction<any[]>>;
  };
export const RecentlyViewedContext = React.createContext<{
    recentlyViewdMovies: any[];
    setRecentlyViewdMovies: React.Dispatch<React.SetStateAction<any[]>>;
}>({
    recentlyViewdMovies: [],
    setRecentlyViewdMovies: () => { }, // Provide a default function
});