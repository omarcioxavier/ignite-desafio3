import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { api } from "../services/api";
import { Product } from "../types";

interface ProductsProviderProps {
    children: ReactNode;
}

export interface ProductsContextData {
    products: Product[];
}

const ProductsContext = createContext<ProductsContextData>({} as ProductsContextData);

export function ProductsProvider({ children }: ProductsProviderProps): JSX.Element {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        api.get('products')
            .then(response => setProducts(response.data))
    }, []);

    return (
        <ProductsContext.Provider value={{ products }} >
            {children}
        </ ProductsContext.Provider>
    );

}

export function useProducts(): ProductsContextData {
    return useContext(ProductsContext);
}