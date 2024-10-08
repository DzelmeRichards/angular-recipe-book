import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DropdownComponent } from 'src/app/shared/components/dropdown/dropdown.component';

@NgModule({
  declarations: [DropdownComponent],
  imports: [CommonModule],
  exports: [DropdownComponent],
})
export class SharedModule {}
