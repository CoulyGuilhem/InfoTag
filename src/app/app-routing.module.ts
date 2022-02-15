import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'ligne-info',
    loadChildren: () => import('./ligne-info/ligne-info.module').then( m => m.LigneInfoPageModule)
  },
  {
    path: 'horaire',
    loadChildren: () => import('./horaire/horaire.module').then( m => m.HorairePageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
