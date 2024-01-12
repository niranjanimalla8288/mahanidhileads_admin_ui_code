export class CustomFields {
    id: number = 0;
    categoryId: number = 0;
    fieldName: string = "";
    fieldTitle: string = "";
    type: string = "";
    options: string = "";
    isRequired: boolean;
    constructor() {
        this.isRequired = false; // Initialize isRequired in the constructor
    }
    helpText: string = "";
    showInDetail: string = "";
    showInSearch: string = "";
    sortOrder: string = "";
    status: string = ""
}