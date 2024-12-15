import axios from "axios";
import useVMs from "./vms";
import useApp from "../store/app";

const { currentHost } = useApp()

const executeScript = async (scriptId: number): Promise<void> => {
    const resp = await axios.post(`http://localhost:8000/vms/${currentHost.value?.id}/execute_script/`, {
        script: scriptId
    })
    return resp.data
}

export default function useScripts() {
    return {
        executeScript,
    }
}