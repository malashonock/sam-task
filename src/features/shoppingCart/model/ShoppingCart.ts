import Guitar, { areGuitarsEqual } from 'features/guitars/model/Guitar';
import ShoppingCartLineItem from './ShoppingCartLineItem';

export interface IShoppingCart {
  lineItems: ShoppingCartLineItem[];
  itemsCount: number;
  pendingOverflow: boolean;
}

export default class ShoppingCart implements IShoppingCart {
  static MAX_ITEMS_COUNT: number = 20;

  constructor(
    public lineItems: ShoppingCartLineItem[] = [],
    public itemsCount: number = 0,
    public pendingOverflow: boolean = false
  ) {
    this.lineItems = lineItems;
    this.itemsCount = itemsCount;
    this.pendingOverflow = pendingOverflow;
  }

  findLineItemIndex(itemToMatch: Guitar): number {
    return this.lineItems
      .map((lineItem: ShoppingCartLineItem): Guitar => lineItem.sku)
      .findIndex((itemInCart: Guitar): boolean => areGuitarsEqual(itemInCart, itemToMatch));
  }

  hasItem(item: Guitar): boolean {
    return this.findLineItemIndex(item) >= 0;
  }

  addItem(itemToAdd: Guitar): void {
    if (this.itemsCount === ShoppingCart.MAX_ITEMS_COUNT) {
      // signal overflow attempt
      this.pendingOverflow = true;
      return;
    }

    const lineItemToIncrementIndex = this.findLineItemIndex(itemToAdd);

    // increment items count
    this.itemsCount++;

    // such line item already exists?
    if (lineItemToIncrementIndex >= 0) {
      // increment matched line item
      const lineItemToIncrement = this.lineItems[lineItemToIncrementIndex];
      lineItemToIncrement.quantity++;
    } else {
      // add new item
      this.lineItems.push({
        sku: itemToAdd,
        quantity: 1,
      });
    }
  }

  removeItem(itemToRemove: Guitar): void {
    const lineItemToDecrementIndex = this.findLineItemIndex(itemToRemove);

    if (lineItemToDecrementIndex < 0) {
      // no such item, nothing to remove
      return;
    }

    // in any case, decrement items count
    this.itemsCount--;

    const lineItemToDecrementQuantity = this.lineItems[lineItemToDecrementIndex].quantity;

    // should line item remain in cart?
    if (lineItemToDecrementQuantity > 1) {
      // decrement matched line item
      this.lineItems[lineItemToDecrementIndex].quantity--;
    } else {
      // remove matched line item
      this.lineItems.splice(lineItemToDecrementIndex, 1);
    }
  }

  removeLineItem(itemToRemove: Guitar): void {
    const lineItemToDecrementIndex = this.findLineItemIndex(itemToRemove);

    if (lineItemToDecrementIndex < 0) {
      // no such item, nothing to remove
      return;
    }

    const lineItemToDecrementQuantity = this.lineItems[lineItemToDecrementIndex].quantity;

    // decrease item count by the quantity of line item being removed
    this.itemsCount -= lineItemToDecrementQuantity;

    // remove line item
    this.lineItems.splice(lineItemToDecrementIndex, 1);
  }

  clone(): ShoppingCart {
    return new ShoppingCart([...this.lineItems], this.itemsCount, this.pendingOverflow);
  }
}
