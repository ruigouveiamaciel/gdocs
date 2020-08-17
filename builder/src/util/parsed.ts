import parsed from "../parsed.json"

export interface TabInfo {
    icon: string;
    key: string;
    label: string;
}

type ParsedType = typeof parsed

export const tabs: TabInfo[] = Object.keys(parsed).map(key => ({
    icon: "heart",
    key: key,
    label: parsed[key as keyof ParsedType].name
}))