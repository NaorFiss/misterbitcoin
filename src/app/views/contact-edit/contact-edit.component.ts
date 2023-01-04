import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { lastValueFrom, Subscription } from 'rxjs';
import { Contact } from 'src/app/models/contact.model';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  contact!: Contact
  subscription!: Subscription

  ngOnInit(): void {

    this.subscription = this.route.data.subscribe(({ contact }) => {
      this.contact = contact || this.contactService.getEmptyContact() as Contact
    })

    // this.route.params.subscribe(async ({ id }) => {
    //     this.contact = id
    //         ? await lastValueFrom(this.contactService.getById(id))
    //         : this.contactService.getEmptyContact() as Contact

    // })
  }

  async onSaveContact() {
    await lastValueFrom(this.contactService.saveContact(this.contact))
    this.router.navigateByUrl('/')

  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

}
