import React, { useEffect, useRef, useState } from 'react';

import { Item } from '../mock-backend/data';

export default function Product({ item, buy, notify }: { item: Item, buy: (itemId: Item['id']) => Promise<void>, notify: (msg: string) => void }) {
  const isUnmounted = useRef(false);
  useEffect(() => {
    return () => {
      isUnmounted.current = true;
    };
  }, []);
  
  const [ isBuying, setIsBuying ] = useState(false);
  const buyProduct = async () => {
    setIsBuying(true);
      
    try {
      await buy(item.id);
      notify('Purchased successfully!');
    } catch (e) {
      notify(e.message);
    }

    setIsBuying(false);
  };

  return (
    <div className="p-6 m-6 bg-white shadow-lg shadow-blue-400/50 w-64">
      <div className="flex flex-col items-center">
        <h5 className="mb-0.5 text-lg font-medium text-gray-900 dark:text-white">{item.name}</h5>

        <div className="grid grid-cols-2 gap-1.5 place-content-center h-40">
          <div className="text-sm font-medium text-right">Price:</div>
          <div className="text-sm">{item.price}</div>
        </div>
        {
          item.inventory <= 0 &&
          <div className="text-sm font-medium text-center">Out of stock</div>
        }
        
        <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button" onClick={buyProduct}>
          {
            isBuying ?
              <div className="spinner-border animate-spin inline-block w-5 h-5 border-4 rounded-full" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            :
              <div className="w-6 h-5">
                Buy
              </div>
          }
        </button>
      </div>
    </div>
  );
}
