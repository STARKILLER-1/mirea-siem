import axios from 'axios'

async function getVMs() {
    return (await axios.get('http://localhost:8000/vms/')).data
}

async function getVMOutput(VMid: number) {
    return (await axios.get(`http://localhost:8000/vms/${VMid}/get_output/`)).data.output
}

export default function useVMs() {
    return {
        getVMs,
        getVMOutput
    }
}