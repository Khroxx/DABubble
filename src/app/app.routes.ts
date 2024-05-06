import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login-page/login/login.component';
import { SignInComponent } from './login-page/sign-in/sign-in.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ResetPasswordComponent } from './login-page/reset-password/reset-password.component';
import { AvatarComponent } from './login-page/avatar/avatar.component';
import { EmailSentComponent } from './email-sent/email-sent.component';
import { CheckEmailComponent } from './login-page/check-email/check-email.component';
import { ImprintComponent } from './shared/imprint/imprint.component';
import { PrivacyPolicyComponent } from './shared/privacy-policy/privacy-policy.component';
import { ChannelComponent } from './main-page/channel/channel.component';
import { ThreadComponent } from './main-page/thread/thread.component';

export const routes: Routes = [

    {   path: 'login-page', component: LoginPageComponent, children: [
            { path: 'login', component: LoginComponent },
            { path: 'signin', component: SignInComponent },
            { path: 'avatar', component: AvatarComponent },
            { path: 'avatar/:id', component: AvatarComponent },
            { path: 'email-sent', component: EmailSentComponent },
            { path: 'check-email', component: CheckEmailComponent },
            { path: 'imprint', component: ImprintComponent },
            { path: 'privacy-policy', component: PrivacyPolicyComponent },
        ]
    },
    { path: 'reset-password', component: ResetPasswordComponent },


        {path: 'main-page', component: MainPageComponent, children: [
            {
                path: ':id', component: ChannelComponent, children: [
                    // noch ein path für den thread vom channel?
                    // { path: ':id', component: ThreadComponent},
                ]
            },
        ]},

];
