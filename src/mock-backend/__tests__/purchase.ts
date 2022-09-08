import { Item } from '../data';
import { executePurchase } from '../purchase';

describe('purchase', () => {
  const itemsSuccess: Item[] = [
    {
      id: 0,
      name: 'Hair Shampoo',
      price: 5.17,
      inventory: 5,
    },
    {
      id: 1,
      name: 'Hair Conditioner',
      price: 5.85,
      inventory: 5,
    },
  ];
  const newItemsSuccess: Item[] = [
    {
      id: 0,
      name: 'Hair Shampoo',
      price: 5.17,
      inventory: 5,
    },
    {
      id: 1,
      name: 'Hair Conditioner',
      price: 5.85,
      inventory: 4,
    },
  ];
  const stateSuccess = {
    balance: 6,
    items: itemsSuccess,
  };
  const newStateSuccess = {
    balance: 0.15,
    items: newItemsSuccess,
  };

  test('Purchased successfully', async () => {
    const result = await executePurchase(1, stateSuccess);
    expect(result).toEqual(newStateSuccess);
  });

  const itemsOutOfStock = [
    {
      id: 0,
      name: 'Hair Shampoo',
      price: 5.17,
      inventory: 0,
    },
    {
      id: 1,
      name: 'Hair Conditioner',
      price: 5.85,
      inventory: 5,
    },
  ];
  const stateOutOfStock = {
    balance: 6,
    items: itemsOutOfStock,
  };

  test('Purchase fails with out of stock error', async () => {
    await expect(executePurchase(0, stateOutOfStock)).rejects.toEqual(Error('Item is out of stock'));
  });

  const itemsNoBalance = [
    {
      id: 0,
      name: 'Hair Shampoo',
      price: 5.17,
      inventory: 5,
    },
    {
      id: 1,
      name: 'Hair Conditioner',
      price: 5.85,
      inventory: 5,
    },
  ];
  const stateNoBalance = {
    balance: 2,
    items: itemsNoBalance,
  };

  test('Purchase fails with insufficient balance error', async () => {
    await expect(executePurchase(0, stateNoBalance)).rejects.toEqual(Error('User has insufficient balance'));
  });
});
