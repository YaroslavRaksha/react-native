
export type CartItemType = {
    id: number,
    title: string,
    price: number,
    storage: string,
    count: number
};

export type ProgressItemsType = {
    progressBarTitle?: string,
    title: string,
    inputs?: { label: string }[]
}
