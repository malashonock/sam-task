import Guitar from 'features/guitars/model/Guitar';

export default interface ShoppingCartLineItem {
  sku: Guitar;
  quantity: number;
}
