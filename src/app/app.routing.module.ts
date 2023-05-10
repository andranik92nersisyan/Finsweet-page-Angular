import { AdminGuard } from './../Adminguards/admin.guard';
import { AuthorGuard } from './../Adminguards/author.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Route[] = [
  {
    path: '',
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./page/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'blog',
    loadChildren: () =>
      import('./page/blog/blog.module').then((m) => m.BlogModule),
  },
  {
    path: 'about-us',
    loadChildren: () =>
      import('./page/about-us/about-us.module').then((m) => m.AboutUsModule),
  },
  {
    path: 'contact-us',
    loadChildren: () =>
      import('./page/contact-us/contact-us.module').then(
        (m) => m.ContactUsModule
      ),
  },
  {
    path: 'blogPost/:id',
    loadChildren: () =>
      import('./page/blog-post/blog-post.module').then((m) => m.BlogPostModule),
  },
  {
    path: 'category',
    loadChildren: () =>
      import('./page/category/category.module').then((m) => m.CategoryModule),
  },
  {
    path: 'author',
    loadChildren: () =>
      import('./page/author/author.module').then((m) => m.AuthorModule),
  },
  {
    path: 'privacyPolicy',
    loadChildren: () =>
      import('./page/privacy-policy/privacy-policy.module').then(
        (m) => m.PrivacyPolicyModule
      ),
  },
  {
    path: 'admin',
    canActivate: [AuthorGuard],
    loadChildren: () =>
      import('./adminn/admin.module').then((m) => m.AdminModule),
  },
  {
    path: 'login-page',
    canActivate: [AdminGuard],
    loadChildren: () =>
      import('./login-page/login-page.module').then((m) => m.LoginPageModule),
  },
  {
    path: '**',
    loadChildren: () =>
      import('./page/notfound/notfound.module').then((m) => m.NotfoundModule),
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'top',
    }),
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
