import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'gender'
})
export class GenderPipe implements PipeTransform {

  transform(value: string): string {
    if(value){
      return "Female"
    }else if(!value){
      return "Male"
    }else{
      return "Not specified"
    }
  }

}
