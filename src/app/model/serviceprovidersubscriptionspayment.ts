

export class Serviceprovidersubscriptionspayment {
  id: number = 0;
  serviceProviderId: number = 0;
  serviceProviderSubscriptionId: number = 0;
  paidAmount: number = 0;
  paymentModeId: number = 0;
  paymentDate!: Date | null;
  transactionReference: string = "";
}
