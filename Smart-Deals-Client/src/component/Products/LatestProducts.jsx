import React, { use } from 'react';

const LatestProducts = ({latestProductsPromise}) => {
    const latestProducts = use(latestProductsPromise);
    console.log(latestProducts);
    return (
        <div>
            
        </div>
    );
};

export default LatestProducts;