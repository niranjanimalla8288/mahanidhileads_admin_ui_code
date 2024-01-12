import { Time } from "@angular/common";

export class Offers {
    id: number = 0;
    postId: number = 0;
    title: string = "";
    longText: string = "";
    featuredImage: string = "";
    hasTimeLimit: number = 0;
    activationDate:Date | undefined;
    expirationDate:Date | undefined;
    createdBy: string = "";
    createdTime: string =''; 
    publishTime: string ='';
    lastUpdatedTime: string ='';
    status: number = 0;

}