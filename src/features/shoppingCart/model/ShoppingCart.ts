import Guitar from 'features/guitars/model/Guitar';

export default interface ShoppingCart {
  guitars: Guitar[];
  pendingOverflow: boolean;
}
