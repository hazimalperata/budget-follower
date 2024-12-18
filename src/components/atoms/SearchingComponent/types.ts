import React from "react";

type SearchingComponentSize = "small" | "medium";
type SearchingComponentRound = "rectangle" | "fullRounded"

export type SearchingComponentProps = {
  placeholder?: string;
  delayedSearchText: string;
  setDelayedSearchText: React.Dispatch<React.SetStateAction<string>>;
  tableSearchElement?: React.JSX.Element | undefined;
  setTableSearchElement?: React.Dispatch<React.SetStateAction<React.JSX.Element | undefined>>;
  size?: SearchingComponentSize;
  round?: SearchingComponentRound;
  className?: string;
  disabled?: boolean;
}
