import { NgModule } from '@angular/core';
import { DateFormatPipe } from './date';

@NgModule({
  imports: [
    // dep modules
  ],
  declarations: [ 
    DateFormatPipe,
   
  ],
  exports: [
    DateFormatPipe,
 
  ],
  
})
export class DatePipesModule {}