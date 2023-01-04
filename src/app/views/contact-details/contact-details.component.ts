
import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription, switchMap } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private location: Location
  ) { }

  @Input() contactId!: string
  contact!: Contact

  subscription!: Subscription

  async ngOnInit(): Promise<void> {

    this.subscription = this.route.params.subscribe(async params => {
      const contactId = params['id']
      const contact = await lastValueFrom(this.contactService.getContactById(contactId))
      this.contact = contact
    })
  }

  //   this.subscription = this.route.data.subscribe(data => {
  //     this.contact = data['contact']
  //     console.log("this.contact", this.contact)
  //   })
  // }

  // async ngOnInit(): Promise<void> {
  //   const contact = await lastValueFrom(this.contactService.getContactById(this.contactId))
  //   this.contact = contact
  // }

  onBack() {
    this.router.navigateByUrl('/')
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
