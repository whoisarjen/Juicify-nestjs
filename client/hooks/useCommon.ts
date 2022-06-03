import useTranslation from "next-translate/useTranslation";
import { useRouter } from "next/router";

const useCommon = () => {
    const router = useRouter();
    const { t } = useTranslation();

	return {
		t,
		router,
	}
}

export type useCommonProps = ReturnType<typeof useCommon>

export default useCommon;