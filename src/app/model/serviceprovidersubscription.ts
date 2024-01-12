
export class Serviceprovidersubscription {
  id: number = 0;
  serviceProviderId: number = 0;
  planId: number = 0;
  startDate!: Date | null;
  endDate!: Date | null;
  contractDocPath: string = "";
  subscriptionAmount: number = 0;
  listingPosition: number = 0;
}
