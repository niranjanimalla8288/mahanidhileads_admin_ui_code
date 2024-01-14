import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SidebarComponent } from './pages/sidebar/sidebar.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { BadgCreateComponent } from './pages/badg/badg-create/badg-create.component';
import { BadgListComponent } from './pages/badg/badg-list/badg-list.component';
import { PlanDetailsComponent } from './pages/plan/plan-details/plan-details.component';
import { PlanUpdateComponent } from './pages/plan/plan-update/plan-update.component';
import { LoginComponent } from './pages/login/login.component';
import { SignUpComponent } from './pages/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { Role } from './model/roles';
import { ServiceProviderSubscriptionPaymentsListComponent } from './pages/ServiceProvderSubscriptionPayments/service-provider-subscription-payments-list/service-provider-subscription-payments-list.component';
import { ServiceProviderCategoryListComponent } from './pages/ServiceProvderCategories/service-provider-category-list/service-provider-category-list.component';
import { CreateServiceProvderCategoriesComponent } from './pages/ServiceProvderCategories/create-service-provder-categories/create-service-provder-categories.component';
import { ServiceProviderCategoryServicesListComponent } from './pages/ServiceProvderCategoryServices/service-provider-category-services-list/service-provider-category-services-list.component';
import { CreateServiceProvderCategoryServicesComponent } from './pages/ServiceProvderCategoryServices/create-service-provder-category-services/create-service-provder-category-services.component';
import { ServiceProviderServicesListComponent } from './pages/ServiceProvderServices/service-provider-services-list/service-provider-services-list.component';
import { CreateServiceProvderServicesComponent } from './pages/ServiceProvderServices/create-service-provder-services/create-service-provder-services.component';
import { CountryListComponent } from './pages/country/country-list/country-list.component';
import { CountryComponent } from './pages/country/country-create/country.component';
import { CustomerListComponent } from './pages/coustomer/customer-list/customer-list.component';
import { OrganizationComponent } from './pages/organization/organization-create/organization.component';
import { OrganizationListComponent } from './pages/organization/organization-list/organization-list.component';
import { PaymentmodeComponent } from './pages/paymentmode/payment-mode-create/paymentmode.component';
import { PaymentModeListComponent } from './pages/paymentmode/payment-mode-list/payment-mode-list.component';
import { CreateServiceProvderBusinesstagsComponent } from './pages/ServiceProvderBusinesstags/create-service-provder-businesstags/create-service-provder-businesstags.component';
import { ServiceProviderBusinessTagsListComponent } from './pages/ServiceProvderBusinesstags/service-provider-business-tags-list/service-provider-business-tags-list.component';
import { CreateServiceProviderBadgesComponent } from './pages/ServiceProviderBadges/create-service-provider-badges/create-service-provider-badges.component';
import { ServiceProviderBadgesComponent } from './pages/ServiceProviderBadges/service-provider-badges/service-provider-badges.component';
import { BusinessListComponent } from './pages/business/business-list/business-list.component';
import { CityListComponent } from './pages/city/city-list/city-list.component';
import { CityareaListComponent } from './pages/cityarea/cityarea-list/cityarea-list.component';
import { CityServiceProviderCategoryListComponent } from './pages/cityserviceprovidercategory/city-service-provider-category-list/city-service-provider-category-list.component';
import { ServiceProviderSubcategoryListComponent } from './pages/ServiceProvderSubCategories/service-provider-subcategory-list/service-provider-subcategory-list.component';
import { ServiceProviderListComponent } from './pages/ServiceProviders/service-provider-list/service-provider-list.component';
import { UpdateServiceProvderSubscriptionPaymentsComponent } from './pages/ServiceProvderSubscriptionPayments/update-service-provder-subscription-payments/update-service-provder-subscription-payments.component';
import { StatesListComponent } from './pages/States/States/states-list/states-list.component';
import { CreateStatesComponent } from './pages/States/States/create-states/create-states.component';
import { CreateServiceProvderSubCategoriesComponent } from './pages/ServiceProvderSubCategories/create-service-provder-sub-categories/create-service-provder-sub-categories.component';
import { AminitiesGetListComponent } from './pages/Aminities/aminities-get-list/aminities-get-list.component';
import { AminitiesCreateUpdateComponent } from './pages/Aminities/aminities-create-update/aminities-create-update.component';
import { OffersGetListComponent } from './pages/Offers/offers-get-list/offers-get-list.component';
import { OffersCreateUpdateComponent } from './pages/Offers/offers-create-update/offers-create-update.component';
import { ServiceProviderReviewsListComponent } from './pages/ServiceProvderReviews/service-provider-reviews-list/service-provider-reviews-list.component';
import { Serviceproviderreview } from './model/serviceproviderreview';
import { CreateServiceProvderReviewsComponent } from './pages/ServiceProvderReviews/create-service-provder-reviews/create-service-provder-reviews.component';
import { ServiceProviderSubscriptionsListComponent } from './pages/ServiceProvderSubscriptions/service-provider-subscriptions-list/service-provider-subscriptions-list.component';
import { CreateServiceProvderSubscriptionsComponent } from './pages/ServiceProvderSubscriptions/create-service-provder-subscriptions/create-service-provder-subscriptions.component';
import { CustomeFieldsListComponent } from './pages/custom-field/custome-fields-list/custome-fields-list.component';
import { CustomeFieldsCreateComponent } from './pages/custom-field/custome-fields-create/custome-fields-create.component';
import { UpdateServieProviderComponent } from './pages/ServiceProviders/update-servie-provider/update-servie-provider.component';
import { CreateServiceProvidersComponent } from './pages/ServiceProviders/create-service-providers/create-service-providers.component';
import { AddsCreateComponent } from './pages/adds/adds-create/adds-create.component';
import { AddsDetailsComponent } from './pages/adds/adds-details/adds-details.component';
import { LeadPositionListComponent } from './pages/LeadPosition/lead-position-list/lead-position-list.component';
import { CreateLeadPositionComponent } from './pages/LeadPosition/create-lead-position/create-lead-position.component';
import { LeadPositionRangeListComponent } from './pages/LeadPositionRange/lead-position-range-list/lead-position-range-list.component';
import { CreateLeadpositionRangeComponent } from './pages/LeadPositionRange/create-leadposition-range/create-leadposition-range.component';
import { BusinessRegisterDetailsComponent } from './pages/business-register-details/business-register-details.component';
import { AlertPageComponent } from './alert-page/alert-page.component';

// canActivate: [AuthGuard], data: { expectedRole: Role.Admin } ,
// children: [
const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'login' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignUpComponent },


  // testing routes
  // { path: '', component: SidebarComponent },
  // { path: 'admin/business-register-details', component: BusinessRegisterDetailsComponent },
  // { path: 'admin/navbar', component: NavbarComponent },
  // { path: 'admin/plan-details', component: PlanDetailsComponent },
  // { path: 'admin/plan-update', component: PlanUpdateComponent },
  // { path: 'admin/badge-create', component: BadgCreateComponent },
  // { path: 'admin/badge-list', component: BadgListComponent },
  // { path: 'admin/service-provider-sub-payment-list', component: ServiceProviderSubscriptionPaymentsListComponent },
  // { path: 'admin/service-provider-sub-payment-create', component: UpdateServiceProvderSubscriptionPaymentsComponent },
  // { path: 'admin/service-provider-category-list', component: ServiceProviderCategoryListComponent },
  // { path: 'admin/service-provider-category-create', component: CreateServiceProvderCategoriesComponent },
  // { path: 'admin/service-provider-category-service-list', component: ServiceProviderCategoryServicesListComponent },
  // { path: 'admin/service-provider-category-service-create', component: CreateServiceProvderCategoryServicesComponent },
  // { path: 'admin/service-provider-service-list', component: ServiceProviderServicesListComponent },
  // { path: 'admin/service-provider-service-create', component: CreateServiceProvderServicesComponent },
  // { path: 'admin/country-list', component: CountryListComponent },
  // { path: 'admin/country-create', component: CountryComponent },
  // { path: 'admin/customer-list', component: CustomerListComponent },
  // { path: 'admin/orgnaization-create', component: OrganizationComponent },
  // { path: 'admin/organization-list', component: OrganizationListComponent },
  // { path: 'admin/payment-mode-create', component: PaymentmodeComponent },
  // { path: 'admin/payment-mode-list', component: PaymentModeListComponent },
  // { path: 'admin/service-provider-business-tags-create', component: CreateServiceProvderBusinesstagsComponent },
  // { path: 'admin/service-provider-business-tags-list', component: ServiceProviderBusinessTagsListComponent },
  // { path: 'admin/service-provider-badges-create', component: CreateServiceProviderBadgesComponent },
  // { path: 'admin/service-provider-badges-list', component: ServiceProviderBadgesComponent },
  // { path: 'admin/BusinessList', component: BusinessListComponent },
  // { path: 'admin/CityList', component: CityListComponent },
  // { path: 'admin/CityareaList', component: CityareaListComponent },
  // { path: 'admin/CityServiceProviderCategoryList', component: CityServiceProviderCategoryListComponent },
  // { path: 'admin/ServiceProviderList', component: ServiceProviderListComponent },
  // { path: 'admin/state-list', component: StatesListComponent },
  // { path: 'admin/update-serviceprovider', component: UpdateServieProviderComponent },
  // { path: 'admin/create-state', component: CreateStatesComponent },
  // { path: 'admin/service-provider-sub-category-list', component: ServiceProviderSubcategoryListComponent },
  // { path: 'admin/state-create', component: CreateServiceProvderSubCategoriesComponent },
  // { path: 'admin/service-provider-category-service-list', component: ServiceProviderCategoryServicesListComponent },
  // { path: 'admin/service-provider-category-service-Create', component: CreateServiceProvderCategoryServicesComponent },
  // { path: 'admin/aminities-list', component: AminitiesGetListComponent },
  // { path: 'admin/aminities-Create', component: AminitiesCreateUpdateComponent },
  // { path: 'admin/offer-list', component: OffersGetListComponent },
  // { path: 'admin/offer-create', component: OffersCreateUpdateComponent },
  // { path: 'admin/service-provider-review-list', component: ServiceProviderReviewsListComponent },
  // { path: 'admin/service-provider-review-Create', component: CreateServiceProvderReviewsComponent },
  // { path: 'admin/service-provider-subscription-list', component: ServiceProviderSubscriptionsListComponent },
  // { path: 'admin/service-provider-subscription-create', component: CreateServiceProvderSubscriptionsComponent },
  // { path: 'admin/custom-field-list', component: CustomeFieldsListComponent },
  // { path: 'admin/custom-field-create', component: CustomeFieldsCreateComponent },
  // { path: 'admin/service-provider-create', component: CreateServiceProvidersComponent },
  // { path: 'admin/adds-create', component: AddsCreateComponent },
  // { path: 'admin/adds-details', component: AddsDetailsComponent },
  // { path: 'admin/lead-positioon-details', component: LeadPositionListComponent },
  // { path: 'admin/lead-position-create', component: CreateLeadPositionComponent },
  // { path: 'admin/lead-position-range-details', component: LeadPositionRangeListComponent },
  // { path: 'admin/lead-position-range-create', component: CreateLeadpositionRangeComponent },



  {
    path: 'admin',
    canActivate: [AuthGuard],
    children: [
      { path: 'business-register-details', component: BusinessRegisterDetailsComponent },
      { path: 'navbar', component: NavbarComponent },
      { path: 'plan-details', component: PlanDetailsComponent },
      { path: 'plan-update', component: PlanUpdateComponent },
      { path: 'badge-create', component: BadgCreateComponent },
      { path: 'badge-list', component: BadgListComponent },
      { path: 'service-provider-sub-payment-list', component: ServiceProviderSubscriptionPaymentsListComponent },
      { path: 'service-provider-sub-payment-create', component: UpdateServiceProvderSubscriptionPaymentsComponent },
      { path: 'service-provider-category-list', component: ServiceProviderCategoryListComponent },
      { path: 'service-provider-category-create', component: CreateServiceProvderCategoriesComponent },
      { path: 'service-provider-category-service-list', component: ServiceProviderCategoryServicesListComponent },
      { path: 'service-provider-category-service-create', component: CreateServiceProvderCategoryServicesComponent },
      { path: 'service-provider-service-list', component: ServiceProviderServicesListComponent },
      { path: 'service-provider-service-create', component: CreateServiceProvderServicesComponent },
      { path: 'country-list', component: CountryListComponent },
      { path: 'country-create', component: CountryComponent },
      { path: 'customer-list', component: CustomerListComponent },
      { path: 'orgnaization-create', component: OrganizationComponent },
      { path: 'organization-list', component: OrganizationListComponent },
      { path: 'payment-mode-create', component: PaymentmodeComponent },
      { path: 'payment-mode-list', component: PaymentModeListComponent },
      { path: 'service-provider-business-tags-create', component: CreateServiceProvderBusinesstagsComponent },
      { path: 'service-provider-business-tags-list', component: ServiceProviderBusinessTagsListComponent },
      { path: 'service-provider-badges-create', component: CreateServiceProviderBadgesComponent },
      { path: 'service-provider-badges-list', component: ServiceProviderBadgesComponent },
      { path: 'BusinessList', component: BusinessListComponent },
      { path: 'CityList', component: CityListComponent },
      { path: 'CityareaList', component: CityareaListComponent },
      { path: 'CityServiceProviderCategoryList', component: CityServiceProviderCategoryListComponent },
      { path: 'ServiceProviderList', component: ServiceProviderListComponent },
      { path: 'state-list', component: StatesListComponent },
      { path: 'update-serviceprovider', component: UpdateServieProviderComponent },
      { path: 'create-state', component: CreateStatesComponent },
      { path: 'service-provider-sub-category-list', component: ServiceProviderSubcategoryListComponent },
      { path: 'state-create', component: CreateServiceProvderSubCategoriesComponent },
      { path: 'service-provider-category-service-list', component: ServiceProviderCategoryServicesListComponent },
      { path: 'service-provider-category-service-Create', component: CreateServiceProvderCategoryServicesComponent },

      { path: 'aminities-list', component: AminitiesGetListComponent },
      { path: 'aminities-Create', component: AminitiesCreateUpdateComponent },

      { path: 'offer-list', component: OffersGetListComponent },
      { path: 'offer-create', component: OffersCreateUpdateComponent },
      { path: 'service-provider-review-list', component: ServiceProviderReviewsListComponent },
      { path: 'service-provider-review-Create', component: CreateServiceProvderReviewsComponent },
      { path: 'service-provider-subscription-list', component: ServiceProviderSubscriptionsListComponent },
      { path: 'service-provider-subscription-create', component: CreateServiceProvderSubscriptionsComponent },

      { path: 'custom-field-list', component: CustomeFieldsListComponent },
      { path: 'custom-field-create', component: CustomeFieldsCreateComponent },
      { path: 'service-provider-create', component: CreateServiceProvidersComponent },
      { path: 'adds-create', component: AddsCreateComponent },
      { path: 'adds-details', component: AddsDetailsComponent },

      { path: 'lead-positioon-details', component: LeadPositionListComponent },
      { path: 'lead-position-create', component: CreateLeadPositionComponent },

      { path: 'lead-position-range-details', component: LeadPositionRangeListComponent },
      { path: 'lead-position-range-create', component: CreateLeadpositionRangeComponent },

      { path: 'alert-page', component: AlertPageComponent },


    ],
  },
  {
    path: 'business',
    canActivate: [AuthGuard], data: { expectedRole: Role.Business },
    children: [{ path: 'service-provider-sub-payment-create', component: UpdateServiceProvderSubscriptionPaymentsComponent }
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }







