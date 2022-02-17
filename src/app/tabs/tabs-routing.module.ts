import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'carte',
        loadChildren: () => import('../carte/carte.module').then(m => m.CartePageModule)
      },
      {
        path: 'itineraire',
        loadChildren: () => import('../itineraire/itineraire.module').then(m => m.ItinerairePageModule)
      },
      {
        path: 'lignes',
        loadChildren: () => import('../lignes/lignes.module').then(m => m.LignesPageModule)
      },
      {
        path: 'compte',
        loadChildren: () => import('../compte/compte.module').then(m => m.ComptePageModule)
      },
      {
        path: 'creation',
        loadChildren: () => import('../creation-compte-user/creation-compte-user.module').then(m => m.CreationCompteUserPageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../user-page/user-page.module').then(m => m.UserPagePageModule)
      },
      {
        path: 'signalement',
        loadChildren: () => import('../signalement/signalement.module').then(m => m.SignalementPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/carte',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/carte',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule { }
