import { Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { GetUserComponent } from './get-user/get-user.component';
import { AddUserComponent } from './add-user/add-user.component';
import { GetUserRequestsByStateComponent } from './get-user-requests-by-state/get-user-requests-by-state.component';
import {GetAnnByStateComponent}from './get-ann-by-state/get-ann-by-state.component';
import { DonorDashboardComponent } from './donor-dashboard/donor-dashboard.component';
import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
import { DashbordDemandeurComponent } from './dashbord-demandeur/dashbord-demandeur.component'
import { AuthenticateComponent } from './authenticate/authenticate.component';
import { GetAnnComponent } from './get-ann/get-ann.component';
import { administratorGuard } from './administrator.guard';
import { UpdateUserComponent } from './update-user/update-user.component';
export const routes: Routes = [
    {path:'', component:AccueilComponent}, 
    {path:'Administrator', component:UpdateUserComponent, canActivate:[administratorGuard]},   
    {path:'Administrator/ProcessAccount/getAllUsers/:state', component:GetAllUsersComponent, canActivate:[administratorGuard]},
    {path:'Administrator/ProcessAccount/getUser/:id', component:GetUserComponent, canActivate:[administratorGuard]},
    {path:'User/CreateAccount/SignUp',component:AddUserComponent},
    {path:'User/Authenticate/:action', component:AuthenticateComponent},
    {path:'app-dashbord-demandeur', component:DashbordDemandeurComponent},
    {path:'Donor', component:GetAnnByStateComponent},
    {path:'get-user-requests-by-state', component: GetUserRequestsByStateComponent },
    {path:'get-ann-by-state', component:GetAnnByStateComponent},
    {path:'donor-dashboard',component:DonorDashboardComponent},
    {path:'Administrator/ConsultAnnouncement', component:GetAnnComponent, canActivate:[administratorGuard]}
];
