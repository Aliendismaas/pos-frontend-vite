import React from "react";
import { Card, CardContent } from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useDispatch } from "react-redux";
import { useToast } from "../../../components/ui/use-toast";
import { addToCart } from "../../../Redux Toolkit/features/cart/cartSlice";

const ProductCard = ({ product }) => {
    const dispatch=useDispatch();
    const toast = useToast();

     const handleAddToCart = (product) => {
      dispatch(addToCart(product));
      toast({
        title: "Added to cart",
        description: `${product.name} added to cart`,
        duration: 1500,
      });
    };

    const displayPrice = product.sellingPrice || product.price;
  return (
    <Card
      key={product.id}
      className="cursor-pointer hover:shadow-md transition-all duration-200 border-2 hover:border-green-800 "
      onClick={() => handleAddToCart(product)}
    >
      <CardContent className="">
        <div className="aspect-square bg-muted rounded-md mb-2 flex items-center justify-center">
         
            <img className="h-30 w-30 object-cover " src={product.image} alt="" />
         
        </div>
        <div className="flex items-center ">
          <div>

            <h3 className="font-medium text-sm truncate">{product.name}</h3>
            <p className="text-xs text-muted-foreground m">{product.sku}</p>
          </div>
         
        </div>
        <div className="flex items-center justify-between">
          <span className="font-bold text-green-600">
            Tzs { displayPrice.toLocaleString()}
          </span>
         <Badge variant="secondary" className="text-xs">
            {product.category}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;



// components/ProductCard.jsx
// import React from "react";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { useDispatch } from "react-redux";
// import { useToast } from "@/components/ui/use-toast";
// import { addToCart } from "@/Redux Toolkit/features/cart/cartSlice";

// const ProductCard = ({ product, isLoading = false }) => {
//   const dispatch = useDispatch();
//   const { toast } = useToast();

//   const handleAddToCart = () => {
//     if (isLoading) return;
//     dispatch(addToCart(product));
//     toast({
//       title: "Added to cart",
//       description: `${product.name} added successfully`,
//       duration: 1500,
//     });
//   };

//   const displayPrice = product.sellingPrice || product.price;

//   // LOADING SKELETON
//   if (isLoading) {
//     return (
//       <Card className="overflow-hidden rounded-xl border-2 border-transparent">
//         <div className="aspect-square bg-gray-100 dark:bg-gray-800">
//           <Skeleton className="w-full h-full rounded-none" />
//         </div>
//         <CardContent className="p-4 space-y-3">
//           <Skeleton className="h-5 w-4/5 rounded-lg" />
//           <Skeleton className="h-3 w-3/5 rounded-lg" />
//           <div className="flex justify-between items-center pt-2">
//             <Skeleton className="h-7 w-28 rounded-lg" />
//             <Skeleton className="h-6 w-20 rounded-full" />
//           </div>
//         </CardContent>
//       </Card>
//     );
//   }

//   // FINAL CARD - NO PLUS BUTTON
//   return (
//     <Card
//       className="group relative overflow-hidden rounded-xl border-2 border-transparent 
//                  cursor-pointer transition-all duration-300 hover:shadow-xl 
//                  hover:border-green-600 hover:-translate-y-1 bg-white dark:bg-gray-900"
//       onClick={handleAddToCart}
//     >
//       {/* Image */}
//       <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
//         <img
//           src={product.image}
//           alt={product.name}
//           className="h-full w-full object-cover transition-transform duration-500 
//                      group-hover:scale-110"
//         />

//         {/* Category Badge */}
//         <Badge
//           variant="secondary"
//           className="absolute top-3 left-3 text-xs font-medium shadow-md backdrop-blur-sm"
//         >
//           {product.category}
//         </Badge>

//         {/* Low Stock Warning */}
//         {product.stock !== undefined && product.stock <= 5 && product.stock > 0 && (
//           <div className="absolute bottom-3 right-3 bg-red-500 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-lg">
//             Only {product.stock} left
//           </div>
//         )}
//         {product.stock === 0 && (
//           <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
//             <span className="text-white font-bold text-lg">Out of Stock</span>
//           </div>
//         )}
//       </div>

//       <CardContent className="p-4">
//         <h3 className="font-semibold text-sm line-clamp-2 leading-tight text-gray-900 dark:text-gray-100">
//           {product.name}
//         </h3>
//         <p className="text-xs text-muted-foreground mt-1">{product.sku}</p>

//         {/* Price Only */}
//         <div className="mt-4">
//           <span className="text-xl font-bold text-green-600">
//             TZS {displayPrice.toLocaleString()}
//           </span>
//         </div>
//       </CardContent>
//     </Card>
//   );
// };

// export default ProductCard;