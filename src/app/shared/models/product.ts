export interface Product{
    $key: string;
    title: string;
    price: number;
    //category: string;
    categories: Array<string>;
    imageUrl: string;
}