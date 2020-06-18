import { Injectable } from '@angular/core';
import { User } from '../_models/user';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../_services/user.service';
import { AlertifyService } from '../_services/alertify.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ListResolver implements Resolve<User[]> {
    pageNumber = 1;
    pageSize = 5;
    likeParam = 'Likers';
    constructor(private userService: UserService, private router: Router, private alertify: AlertifyService){}

    resolve(route: ActivatedRouteSnapshot): Observable<User[]> {
        return this.userService.getUsers(this.pageNumber, this.pageSize, null, this.likeParam).pipe(
          catchError(error => {
            this.alertify.error('Problem retrieving data');
            this.router.navigate(['/']);
            return of(null);
          })
        );
      }
}
