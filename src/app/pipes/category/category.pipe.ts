import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'category'
})
export class CategoryPipe implements PipeTransform {

  transform(items: any[], cat: string): any {
    if(!items) return []
    return items.filter( it => {
      return it.category === cat;
    });
   }
}