import { Component, OnInit } from '@angular/core';
import { EnrollmentService } from '../enrollment.service';
import { User } from '../user';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrls: ['./forms.component.scss']
})
export class FormsComponent implements OnInit {

  topics = ['Angular', 'React', 'Vue'];
  topicHasError = true;

  submitted = false;
  errorMsg = '';

  userModel = new User('', 'sara@sara.com', '049299709', 'default', 'morning', true);

  constructor(private _enrollmentService: EnrollmentService) { }

  ngOnInit() {
  }

  validateTopic(value: string) {
    if(value === 'default') {
      this.topicHasError = true;
    } else {
      this.topicHasError = false;
    }
  }

  onSubmit() {
    this.submitted = true;
    this._enrollmentService.enroll(this.userModel)
    .subscribe(
      data => console.log("Success!" ,data),
      error => this.errorMsg = error.statusText
    )
  }

}
