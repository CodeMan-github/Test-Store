import { Item } from './data';
import { sleep } from './utils';

type UserAndItemState = {
  balance: number;
  items: Item[];
};

/**
 * Modifies `state`, given an `itemId` to purchase
 * @returns {UserAndItemState} the updated state if a purchase should succeed
 */
export const executePurchase = async (
  itemId: Item['id'],
  state: UserAndItemState
): Promise<UserAndItemState> => {
  // NOTE: the following line intentionally pauses execution in this
  // function and MUST remain in tact for the assignment to replicate a
  // network request.
  await sleep(1000);

  const { balance, items } = state;
  const item = items.find(ele => ele.id === itemId);

  if (!item?.inventory) {
    throw new Error('Item is out of stock');
  }

  if (!item?.price || balance < item?.price) {
    throw new Error('User has insufficient balance');
  }

  const newItems = items.map(ele => ele.id === itemId ? { ...ele, inventory: ele.inventory - 1 } : ele);
  const price = item?.price ? item.price : 0;
  const newBalance = (balance - price).toFixed(2);

  return {
    balance: Number(newBalance),
    items: newItems,
  };
};
