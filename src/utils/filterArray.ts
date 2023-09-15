import { getOnStateT } from "types/getOnStateT";

export function filterState(state: string, array: getOnStateT[]) {
    return array.filter(item => item.state === state)
}