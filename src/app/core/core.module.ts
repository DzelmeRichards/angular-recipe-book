import { ErrorHandler, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ErrorHandlerService } from 'src/app/core/services/error-handler/error-handler.service';

import { HeaderComponent } from 'src/app/core/header/header.component';
import { NavigationComponent } from 'src/app/core/header/components/navigation/navigation.component';
import { PageNotFoundComponent } from 'src/app/core/page-not-found/page-not-found.component';
import { PopupMessageComponent } from 'src/app/core/popup-message/popup-message.component';
import { LoadingIndicatorComponent } from 'src/app/core/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    HeaderComponent,
    NavigationComponent,
    PageNotFoundComponent,
    PopupMessageComponent,
    LoadingIndicatorComponent,
  ],
  imports: [CommonModule, FormsModule, RouterModule],
  providers: [{ provide: ErrorHandler, useClass: ErrorHandlerService }],
  exports: [
    HeaderComponent,
    PageNotFoundComponent,
    PopupMessageComponent,
    LoadingIndicatorComponent,
  ],
})
export class CoreModule {}
