export interface generalType{
    id:number;
    name?:string;
    slug?:string;
    created_at?:string;
}
export interface brandsType extends generalType{
    details:string;
    image_logo:{
        alt:string;
        url:string 
    }
}


export interface userProfileType extends generalType {
    firstname: string;
    lastname: string;
    email?: string,
    phone_no?: number
}


export interface priceType {
    minMRP: number,
    maxMRP: number
}

export interface responseType {
    message: string;
    data: []
}

export interface categoriesType extends generalType{
    image:{
        alt:string;
        url:string;
    }
}
export interface productVariantType extends generalType{
    color:string ;
    currency:string;
    default:boolean;
    description:string;
    discount:number;
    image_keys:{
        isCoverImg:string;
        product_url:string
    };
    in_stock:boolean;
    isBestSeller:boolean;
    products?:productType;
    size:string;
    mrp:number
}
export interface productType extends generalType{
    brands:brandsType;
    categories:categoriesType;
    productVariants:productVariantType;
    colors?:string[];
}
export interface CartItemtype extends generalType{ 
    quantity: number,
    productVariants:productVariantType,
    users:userProfileType
}

export interface reviewType extends generalType{
    stars:number;
    text:string;
    users:userProfileType;
}