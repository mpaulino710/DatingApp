import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { error } from 'protractor';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  @Input() user: User;
  constructor(private authService: AuthService, private userServices: UserService, private alertiry: AlertifyService) { }

  ngOnInit() {
  }

  sendLike(id: number) {
    this.userServices.sendlike(this.authService.decodeToken.nameid, id).subscribe(data => {
      this.alertiry.success('You have liked: ' + this.user.knownAs);
    // tslint:disable-next-line: no-shadowed-variable
    }, error => {
      this.alertiry.error(error);
    });
  }

}
