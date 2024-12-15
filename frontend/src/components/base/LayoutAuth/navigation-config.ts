import useApp from "../../../store/app.ts";
import {computed, reactive, ref} from "vue";
const { currentHost } = useApp()

export type MenuItem = {
    label: string,
    redirect: { name: string },
    isVisible: boolean,
}
const MENU_ITEMS = computed<MenuItem[]>(() => {
    return [{
        label: 'Установка соединения',
        redirect: { name: 'connect' },
        isVisible: true,
    },{
        label: 'Инциденты',
        redirect: { name: 'incidents' },
        isVisible: !!currentHost.value,
    },/*{
        label: 'Рекомендации',
        redirect: { name: 'recommendations' },
        isVisible: currentHost.value,
    },*/{
        label: 'Скрипты',
        redirect: { name: 'scripts' },
        isVisible: !!currentHost.value,
    } ]
})
export default function useNavigationConfig() {

    
    return {
        MENU_ITEMS,
    }
}