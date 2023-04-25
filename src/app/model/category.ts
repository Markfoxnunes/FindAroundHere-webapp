export class Category {
    id: string;
    name: string;
    image: string;
    subcategories: Subcategory[];
}

export class Subcategory {
    id: string;
    name: string;
    image: string;
}