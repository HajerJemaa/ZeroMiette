import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AccueilComponent } from './accueil/accueil.component';
import { GetUserComponent } from './get-user/get-user.component';
//import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { GetUserRequestsByStateComponent } from './get-user-requests-by-state/get-user-requests-by-state.component';
import {GetAnnByStateComponent}from './get-ann-by-state/get-ann-by-state.component';
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { RecieverComponent } from './reciever/reciever.component';
import { DonorComponent } from './donor/donor.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
export const routes: Routes = [
    {path:'', component:AccueilComponent},    
    {path:'Administrator', component:AdministratorComponent},
    {path:'Administrator/ProcessAccount/getAllUsers/:state', component:GetAllUsersComponent},
    {path:'Administrator/ProcessAccount/getUser/:id', component:GetUserComponent},
    {path:'User', component:UserComponent},
    {path:'User/CreateAccount/SignUp',component:AddUserComponent},
    {path:'User/Authenticate/:action', component:AuthenticateComponent},
    {path:'Reciever', component:RecieverComponent},
    {path:'Donor', component:DonorComponent},
    {path:'get-user-requests-by-state', component: GetUserRequestsByStateComponent },
    {path:'get-ann-by-state', component:GetAnnByStateComponent},
    {path:'donor-dashboard',component:DonorDashboardComponent}
];
