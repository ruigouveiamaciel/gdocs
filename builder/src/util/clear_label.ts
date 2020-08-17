
export default function clear_label(label: string) {
    return label.split(/[.:]/g).pop() ?? ""
}
