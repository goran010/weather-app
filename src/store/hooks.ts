import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { RootState, storeDispatch } from ".";

export const useStoreDispatch =()=> useDispatch<storeDispatch>();
export const useStoreSelector: TypedUseSelectorHook<RootState> = useSelector
;
