import {ref} from "vue";

const currentHost = ref<{id: number, name: string, ip_address: string, scripts: {id:number, name: string, description: string, category: string}[]} | null>(null)
const setCurrentHost = (newValue): void  => {
    currentHost.value = newValue
}
export default function useApp() {
    return {
        currentHost,
        setCurrentHost,
    }
}