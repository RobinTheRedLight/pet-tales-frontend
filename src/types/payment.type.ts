export interface IPayment {
  _id: string;
  userEmail: string;
  amount: number;
  paymentIntentId: string;
}
