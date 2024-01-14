import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './pages/admin/admin.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';
import { BadgCreateComponent } from './pages/badg/badg-create/badg-create.component';
import { BadgListComponent } from './pages/badg/badg-list/badg-list.component';
import { PlanDetailsComponent } from './pages/plan/plan-details/plan-details.component';
import { PlanUpdateComponent } from './pages/plan/plan-update/plan-update.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './services/token.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { LoginComponent } from './pages/login/login.component';
import { ServiceProviderSubscriptionPaymentsListComponent } from './pages/ServiceProvderSubscriptionPayments/service-provider-subscription-payments-list/service-provider-subscription-payments-list.component';
import { ServiceProviderServicesListComponent } from './pages/ServiceProvderServices/service-provider-services-list/service-provider-services-list.component';
import { ServiceProviderCategoryListComponent } from './pages/ServiceProvderCategories/service-provider-category-list/service-provider-category-list.component';
import { CreateServiceProvderCategoriesComponent } from './pages/ServiceProvderCategories/create-service-provder-categories/create-service-provder-categories.component';
import { ServiceProviderCategoryServicesListComponent } from './pages/ServiceProvderCategoryServices/service-provider-category-services-list/service-provider-category-services-list.component';
import { CreateServiceProvderCategoryServicesComponent } from './pages/ServiceProvderCategoryServices/create-service-provder-category-services/create-service-provder-category-services.component';
import { CreateServiceProvderServicesComponent } from './pages/ServiceProvderServices/create-service-provder-services/create-service-provder-services.component';
import { CountryComponent } from './pages/country/country-create/country.component';
import { CountryListComponent } from './pages/country/country-list/country-list.component';
import { CustomerListComponent } from './pages/coustomer/customer-list/customer-list.component';
import { OrganizationComponent } from './pages/organization/organization-create/organization.component';
import { OrganizationListComponent } from './pages/organization/organization-list/organization-list.component';
import { PaymentmodeComponent } from './pages/paymentmode/payment-mode-create/paymentmode.component';
import { PaymentModeListComponent } from './pages/paymentmode/payment-mode-list/payment-mode-list.component';
import { CreateServiceProvderBusinesstagsComponent } from './pages/ServiceProvderBusinesstags/create-service-provder-businesstags/create-service-provder-businesstags.component';
import { ServiceProviderBusinessTagsListComponent } from './pages/ServiceProvderBusinesstags/service-provider-business-tags-list/service-provider-business-tags-list.component';
import { CreateServiceProviderBadgesComponent } from './pages/ServiceProviderBadges/create-service-provider-badges/create-service-provider-badges.component';
import { ServiceProviderBadgesComponent } from './pages/ServiceProviderBadges/service-provider-badges/service-provider-badges.component';
import { CoustomerComponent } from './pages/coustomer/customer-create/coustomer.component';
import { BusinessListComponent } from './pages/business/business-list/business-list.component';
import { BusinessCreateComponent } from './pages/business/business-create/business-create.component';
import { CityListComponent } from './pages/city/city-list/city-list.component';
import { CityCreateComponent } from './pages/city/city-create/city-create.component';
import { CityareaListComponent } from './pages/cityarea/cityarea-list/cityarea-list.component';
import { CityareaComponent } from './pages/cityarea/city-create/cityarea.component';
import { CityserviceprovidercategoryComponent } from './pages/cityserviceprovidercategory/city-service-provider-category-create/cityserviceprovidercategory.component';
import { CityServiceProviderCategoryListComponent } from './pages/cityserviceprovidercategory/city-service-provider-category-list/city-service-provider-category-list.component';
import { ServiceProviderListComponent } from './pages/ServiceProviders/service-provider-list/service-provider-list.component';
import { CreateServiceProvidersComponent } from './pages/ServiceProviders/create-service-providers/create-service-providers.component';
import { CreateServiceProvderSubCategoriesComponent } from './pages/ServiceProvderSubCategories/create-service-provder-sub-categories/create-service-provder-sub-categories.component';
import { ServiceProviderSubcategoryListComponent } from './pages/ServiceProvderSubCategories/service-provider-subcategory-list/service-provider-subcategory-list.component';
import { MatTabsModule } from '@angular/material/tabs'
import { UpdateServiceProvderSubscriptionPaymentsComponent } from './pages/ServiceProvderSubscriptionPayments/update-service-provder-subscription-payments/update-service-provder-subscription-payments.component';
import { StatesListComponent } from './pages/States/States/states-list/states-list.component';
import { CreateStatesComponent } from './pages/States/States/create-states/create-states.component';
import { AminitiesCreateUpdateComponent } from './pages/Aminities/aminities-create-update/aminities-create-update.component';
import { AminitiesGetListComponent } from './pages/Aminities/aminities-get-list/aminities-get-list.component';
import { OffersCreateUpdateComponent } from './pages/Offers/offers-create-update/offers-create-update.component';
import { OffersGetListComponent } from './pages/Offers/offers-get-list/offers-get-list.component';
import { CreateServiceProvderReviewsComponent } from './pages/ServiceProvderReviews/create-service-provder-reviews/create-service-provder-reviews.component';
import { ServiceProviderReviewsListComponent } from './pages/ServiceProvderReviews/service-provider-reviews-list/service-provider-reviews-list.component';
import { ServiceProviderSubscriptionsListComponent } from './pages/ServiceProvderSubscriptions/service-provider-subscriptions-list/service-provider-subscriptions-list.component';
import { CreateServiceProvderSubscriptionsComponent } from './pages/ServiceProvderSubscriptions/create-service-provder-subscriptions/create-service-provder-subscriptions.component';
import { CustomeFieldsListComponent } from './pages/custom-field/custome-fields-list/custome-fields-list.component';
import { CustomeFieldsCreateComponent } from './pages/custom-field/custome-fields-create/custome-fields-create.component';
import { UpdateServieProviderComponent } from './pages/ServiceProviders/update-servie-provider/update-servie-provider.component';
import { AddsDetailsComponent } from './pages/adds/adds-details/adds-details.component';
import { AddsCreateComponent } from './pages/adds/adds-create/adds-create.component';
import { LeadPositionListComponent } from './pages/LeadPosition/lead-position-list/lead-position-list.component';
import { CreateLeadPositionComponent } from './pages/LeadPosition/create-lead-position/create-lead-position.component';
import { LeadPositionRangeListComponent } from './pages/LeadPositionRange/lead-position-range-list/lead-position-range-list.component';
import { CreateLeadpositionRangeComponent } from './pages/LeadPositionRange/create-leadposition-range/create-leadposition-range.component';
import { BusinessRegisterDetailsComponent } from './pages/business-register-details/business-register-details.component';
import { AlertPageComponent } from './alert-page/alert-page.component';
@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    NavbarComponent,
    SidebarComponent,
    PlanDetailsComponent,
    PlanUpdateComponent,
    BadgCreateComponent,
    BadgListComponent,
    ServiceProviderSubscriptionPaymentsListComponent,
    UpdateServiceProvderSubscriptionPaymentsComponent,
    ServiceProviderServicesListComponent,
    ServiceProviderCategoryListComponent,
    CreateServiceProvderCategoriesComponent,
    ServiceProviderCategoryServicesListComponent,
    CreateServiceProvderCategoryServicesComponent,
    CreateServiceProvderServicesComponent,
    CountryComponent,
    CountryListComponent,
    CustomerListComponent,
    OrganizationComponent,
    OrganizationListComponent,
    PaymentmodeComponent,
    PaymentModeListComponent,
    CreateServiceProvderBusinesstagsComponent,
    ServiceProviderBusinessTagsListComponent,
    CreateServiceProvderCategoriesComponent,
    ServiceProviderCategoryListComponent,
    CreateServiceProviderBadgesComponent,
    ServiceProviderBadgesComponent,
    CoustomerComponent,

    BusinessListComponent,
    BusinessCreateComponent,
    CityListComponent,
    CityCreateComponent,
    CityareaListComponent,
    CityareaComponent,
    CityserviceprovidercategoryComponent,
    CityServiceProviderCategoryListComponent,
    ServiceProviderListComponent,
    CreateServiceProvidersComponent,
    CreateServiceProvderSubCategoriesComponent,
    ServiceProviderSubcategoryListComponent,

    SignUpComponent,
    LoginComponent,
    StatesListComponent,
    CreateStatesComponent,
    AminitiesGetListComponent,
    AminitiesCreateUpdateComponent,
    OffersGetListComponent,
    OffersCreateUpdateComponent,
    ServiceProviderReviewsListComponent,
    CreateServiceProvderReviewsComponent,
    ServiceProviderSubscriptionsListComponent,
    CreateServiceProvderSubscriptionsComponent,
    CustomeFieldsListComponent,
    CustomeFieldsCreateComponent,
    UpdateServieProviderComponent,
    AddsDetailsComponent,
    AddsCreateComponent,
    LeadPositionListComponent,
    CreateLeadPositionComponent,
    LeadPositionRangeListComponent,
    CreateLeadpositionRangeComponent,
    BusinessRegisterDetailsComponent,
    AlertPageComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(),
    MatTabsModule,

  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
