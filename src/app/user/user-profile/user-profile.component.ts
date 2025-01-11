import { Component, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild, ViewEncapsulation } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserProfile } from './user-profile.interface';
import { Store } from '@ngrx/store';
import { AppState } from '../../states/app.state';
import * as getUserSelector from './../../states/getUser/getUser.selector'
import { AsyncPipe, CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from '../../services/common/common.service';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [CommonModule, AsyncPipe],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
  encapsulation: ViewEncapsulation.ShadowDom
})
export class UserProfileComponent implements OnInit, OnDestroy{

  //Declare Variables here------------------------------------------------------------
  $user: Observable<UserProfile | null>;
  $error: Observable<string | null>;
  isHovered = signal(false)
  @ViewChild('textarea') textarea?: ElementRef;
  username?: string;
  UserData?: Subscription


  //Declare Services here------------------------------------------------------------
  private store = inject(Store<AppState>);
  private activatedRouter = inject(ActivatedRoute)
  private route = inject(Router)
  private commonServices = inject(CommonService)


  constructor() {
    this.$user = this.store.select(getUserSelector.getAllUser);
    this.$error = this.store.select(getUserSelector.selectUserError);
  }

  ngOnInit(): void {

    this.UserData=this.$user?.subscribe((user)=>{
      this.username= user?.db_username
    })
    let usernameIDParam = this.activatedRouter.snapshot.paramMap.get('usernameID');

    //If username is changed in the URL, it will go to 404 page
    this.commonServices.compareRoutes(usernameIDParam,this.username)

  }

  ngOnDestroy(): void {
      if(this.UserData){
        this.UserData.unsubscribe()
      }
  }

  //Font color change on hover
  onHover(state: boolean) {
    this.isHovered.set(state);
  }

  fields = [
    { label: 'About Me', key: 'db_aboutUser', class: 'title-data-input-aboutuser' },
    { label: 'Full Name', key: 'db_fullname' },
    { label: 'Email', key: 'db_email' },
    { label: 'Date of Birth', key: 'db_dob' },
    { label: 'Gender', key: 'db_gender' },
    { label: 'Address', key: 'db_address' },
    { label: 'Phone Number', key: 'db_phoneNumber' },
    { label: 'Profile Creation Date', key: 'db_dtecre' },
    { label: 'Last Login Date', key: 'db_dteLastLogin' },
    { label: 'Last Modification Date', key: 'db_dtemod' },
  ];
  

}
