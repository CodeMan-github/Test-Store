import { useState } from 'react';

import { initialBalance, initialItems, Item } from './data';
import { executePurchase } from './purchase';

type UseCheckout = {
  inItems: Item[];
  outItems: Item[];

  /**
   * Charges the current account with the `price` in USD and decrements an item's inventory
   *
   * @throws if the current account does not have enough or if no inventory
   *
   */
  buy: (itemId: Item['id']) => Promise<void>;
};

export const useCheckout = (): UseCheckout => {
  const [ balance, setBalance ] = useState(initialBalance);

  const initialInItems = initialItems.filter(ele => ele.inventory > 0);
  const initialOutItems = initialItems.filter(ele => ele.inventory <= 0);
  const [ inItems, setInItems ] = useState(initialInItems);
  const [ outItems, setOutItems ] = useState(initialOutItems);

  return {
    buy: async (itemId: Item['id']) => {
      const newState = await executePurchase(itemId, { balance, items: [...inItems, ...outItems] });
      setBalance(newState.balance);
      const newInItems = newState.items.filter(ele => ele.inventory > 0);
      const newOutItems = newState.items.filter(ele => ele.inventory <= 0);
      setInItems(newInItems);
      setOutItems(newOutItems);
    },
    inItems,
    outItems,
  };
};
