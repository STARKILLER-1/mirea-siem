import {computed, ref} from "vue";

type Script = {id:number, name: string, description: string, category: string}
type StatusBody = {
    title: string,
    color: string,
}
export const AVAILABLE_STATUSES: Record<string, StatusBody> = {
    '0': {
        title: 'Не выполнен',
        color: `grey`,
    },

    '1': {
        title: 'Выполнен. Найдена ошибка',
        color: `red`,
    },

    '2': {
        title: 'Выполнен. Ошибок не найдено',
        color: `green`,
    },
    '3': {
        title: 'Ошибка при выполнении',
        color: `black`,
    }
}

export interface ExtendedScript extends Script {
    isLoading: boolean
    status: StatusBody
    statusText?: string
    warning? :string[],
    recommendationText?: string[]
    category: string
}

const scriptsList = ref<ExtendedScript[]>([])
const scriptsFilterState = ref<{title: string}[]>([])
const filteredScripts = computed<ExtendedScript[]>(() => {
    return scriptsList.value.filter((script: ExtendedScript) => {
        return !scriptsFilterState.value.length || scriptsFilterState.value.find((scriptType: {title: string}) => {
            return script.category === scriptType.title
        })
    })
})
const availableScriptTypes = ref<{title: string}[]>([
    {title: 'Обычные'},
    {title: 'Сетевые'},
    {title: 'ПО'},
    {title: 'Системные'},

])
const setScriptsList = (newValue: Script[]): void => {
    scriptsList.value = newValue.map((script: Script): ExtendedScript => {
        return {
            ...script,
            isLoading: false,
            status: AVAILABLE_STATUSES['0']
        }
    })
}
const setIsScriptLoading = (script: ExtendedScript, newVal: boolean): void => {
    script.isLoading = newVal
}

export default function useScriptsStore() {
    return {
        scriptsList,
        filteredScripts,
        setScriptsList,
        scriptsFilterState,
        availableScriptTypes,
    }
}
