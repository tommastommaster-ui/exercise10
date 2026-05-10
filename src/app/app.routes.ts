import { Routes } from '@angular/router';
import { Intro } from './intro/intro'
import { Login } from './auth/login/login'
import { MessageList} from './message/message-list/message-list'
import { authGuard } from './auth/guard-guard'; 
import { Conversation } from './message/conversation/conversation';

export const routes: Routes = [
    { path: '', component: Intro},
    { path: 'login', component: Login },
    { path: 'messages', component: MessageList, canActivate: [authGuard]},
    { path: 'conversation', component: Conversation}
];
