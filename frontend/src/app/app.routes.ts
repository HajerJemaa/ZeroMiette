import { Routes } from '@angular/router';
import { Component } from '@angular/core';
import { AccueilComponent } from './accueil/accueil.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { GetUserComponent } from './get-user/get-user.component';
import { DeleteUserComponent } from './delete-user/delete-user.component';
import { GetAllUsersComponent } from './get-all-users/get-all-users.component';
import { AddUserComponent } from './add-user/add-user.component';
import { UserComponent } from './user/user.component';
import { AdministratorComponent } from './administrator/administrator.component';
import { GetUserRequestsByStateComponent } from './get-user-requests-by-state/get-user-requests-by-state.component';
import {GetAnnByStateComponent}from './get-ann-by-state/get-ann-by-state.component'
export const routes: Routes = [
    {path:'', component:AccueilComponent},
    {path:'User/CreateAccount', component:CreateAccountComponent},
    {path:'User/CreateAccount/addUser', component:AddUserComponent},
    {path:'User/ProcessAccount/getAllUsers/:state', component:GetAllUsersComponent},
    {path:'User/ProcessAccount/getUser/:id', component:GetUserComponent},
    {path:'User/ProcessAccount/deleteUser',  component:DeleteUserComponent},
    {path:'User', component:UserComponent},
    {path:'Administrator', component:AdministratorComponent},
    {path:'get-user-requests-by-state', component: GetUserRequestsByStateComponent },
    {path:'get-ann-by-state', component:GetAnnByStateComponent}

];
