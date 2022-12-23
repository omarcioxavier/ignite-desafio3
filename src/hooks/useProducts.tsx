import { createContext, ReactNode, useContext, useState } from "react";
import { Product } from "../types";

interface ProductsProviderProps {
    children: ReactNode;
}

export interface ProductsContextData {
    products: Product[];
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps): JSX.Element {
    const [products] = useState<Product[]>([]);

    return (
        <ProductsContext.Provider value={{ products }} >
            {children}
        </ ProductsContext.Provider>
    );

}

export function useProducts(): ProductsContextData {
    return useContext(ProductsContext);
}