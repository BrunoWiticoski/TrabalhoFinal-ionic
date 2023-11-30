import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: 'pessoas',
    loadChildren: () =>
      import('./pessoas/pessoas.module').then((m) => m.PessoasPageModule),
  },
  {
    path: 'bicicleta',
    loadChildren: () =>
      import('./bicicleta/bicicleta.module').then((m) => m.BicicletasPageModule),
  },  
  {
    path: 'metas',
    loadChildren: () =>
      import('./metas/metas.module').then((m) => m.MetasPageModule),
  }, 
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
