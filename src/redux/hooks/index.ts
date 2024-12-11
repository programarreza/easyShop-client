import type { AppDispatch, RootState } from "../store/store";

import { useDispatch, useSelector, useStore } from "react-redux";

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: <TSelected>(
  selector: (state: RootState) => TSelected
) => TSelected = useSelector;
export const useAppStore = useStore;
