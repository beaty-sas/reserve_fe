import { allLangs } from "src/layouts/common/language-popover";
import { localStorageGetItem } from "src/utils/storage-available";

const defaultLang = 'ua';

export function useLocales() {
    const langStorage = localStorageGetItem('i18nextLng');

    const currentLang = defaultLang;

    return {
        allLangs,
        currentLang,
    };
}