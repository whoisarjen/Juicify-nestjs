import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";
import { useAppSelector } from "./useRedux";

const useCommon = () => {
    const router = useRouter();
    const token: any = useAppSelector(state => state.token.value)
    const { t } = useTranslation();

	return {
		t,
		token,
		router,
	}
}

export type useCommonProps = ReturnType<typeof useCommon>

export default useCommon;