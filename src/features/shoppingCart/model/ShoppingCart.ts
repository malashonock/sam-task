import Guitar from '../../guitars/model/Guitar';

export default interface ShoppingCart {
  guitars: Guitar[];
  pendingOverflow: boolean;
}
