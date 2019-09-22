import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, FormArray, Validators } from "@angular/forms";
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore'
import { Observable } from 'rxjs';

interface Student {
  personalInfo: object,
  father: object,
  mother: object,
  permanantAddress: object,
  currentAddress: object,
  academicDetails: object,
  skills: string[],
  internships: string[]
}

@Component({
  selector: "app-personal-info",
  templateUrl: "./personal-info.component.html",
  styleUrls: ["./personal-info.component.css"]
})
export class PersonalInfoComponent implements OnInit {

  myForm: FormGroup;
  personalInfo: FormGroup;
  parentsInfo: FormGroup;
  address: FormGroup;
  academicDetails: FormGroup;

  studentsCollection : AngularFirestoreCollection<Student>
  students: Observable<Student[]>
  success: boolean = false;

  constructor(private fb: FormBuilder, private afs: AngularFirestore) {}

  ngOnInit() {

    this.personalInfo = this.fb.group({
      firstName: ['',[
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ]],
      middleName: ['',[
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ]],
      lastName: ['',[
        Validators.required,
        Validators.pattern('[a-zA-Z]*')
      ]],
      grNo: ['',[
        Validators.required,
        Validators.pattern('[0-9]{2}[u|U][0-9]{3}')
      ]],
      rollNo: ['',[
        Validators.required
      ]],
      academicYear: ['',[
        Validators.required
      ]],
      shift: ['',[
        Validators.required
      ]],
      branch: ['',[
        Validators.required
      ]],
      batch: ['',[
        Validators.required
      ]],
      birthDate: ['',[
        Validators.required
      ]],
      mobile: ['',[
        Validators.required,
        Validators.pattern("^(\\+?\\d{1,4}[\\s-])?(?!0+\\s+,?$)\\d{10}\\s*,?$")
      ]],
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      caste: ['',[
        Validators.required
      ]]
    });
    this.parentsInfo = this.fb.group({
      designation: "",
      email: ['',[
        Validators.required,
        Validators.email
      ]],
      mobileNo: ['',[
        Validators.required,
        Validators.pattern("^(\\+?\\d{1,4}[\\s-])?(?!0+\\s+,?$)\\d{10}\\s*,?$")
      ]],
      name: ['',[
        Validators.required,
      ]],
      profession: ['',[
        Validators.required,
      ]],
    });
    this.address = this.fb.group({
      address: ['',[
        Validators.required,
      ]],
      area: ['',[
        Validators.required,
      ]],
      city: ['',[
        Validators.required,
      ]],
      pinCode: ['',[
        Validators.required,
      ]],
      state: ['',[
        Validators.required,
      ]],
    });
     this.academicDetails = this.fb.group({
      "10th Marks": ['',[
        Validators.required,
      ]],
      "12th Marks": ['',[
        Validators.required,
      ]],
      becgpa: "",
      fycgpa: ['',[
        Validators.required
      ]],
      sycgpa: "",
      tycgpa: ""
    });

    this.myForm = this.fb.group({
      personalInfo: this.personalInfo,
      father: this.parentsInfo,
      mother: this.parentsInfo,
      permanantAddress: this.address,
      currentAddress: this.address,
      academicDetails: this.academicDetails,
      skills: this.fb.array([]),
      internships: this.fb.array([])
    });
  }

  get firstName() {
    return this.personalInfo.get('firstName')
  }
  get middleName() {
    return this.personalInfo.get('middleName')
  }
  get lastName() {
    return this.personalInfo.get('lastName')
  }
  get grNo() {
    return this.personalInfo.get('grNo')
  }
  get personalMobile() {
    return this.personalInfo.get('mobile')
  }
  get motherMobile() {
    return this.myForm.get('mother').get('mobileNo')
  }
  get fatherMobile() {
    return this.myForm.get('father').get('mobileNo')
  }

  get skillsArray() {
    return this.myForm.get('skills') as FormArray
  }

  addSkill() {
    const skill = this.fb.group({
      title : []
    })
    this.skillsArray.push(skill)
  }

  deleteSkill(i) {
    this.skillsArray.removeAt(i)
  }

  get IntershipsArray() {
    return this.myForm.get('internships') as FormArray
  }

  addInternship() {
    const intership = this.fb.group({
      companyName: [],
      description: []
    })
    this.IntershipsArray.push(intership)
  }

  deleteInternship(i) {
    this.IntershipsArray.removeAt(i)
  }


  duplicateAddressClicked(event) {
    if (event.checked) {
      // this.myForm.value.currentAddress = this.myForm.value.permanantAddress
      this.myForm.patchValue(
        {
          currentAddress: this.myForm.value.permanantAddress
        })
    } else {
      this.myForm.patchValue(
        {
          currentAddress: {address: "",
          area: "",
          city: "",
          pinCode: "",
          state: ""}
        })
    }
  }

  submitForm() {
    let collectionName = ''
    collectionName = (this.myForm.value.personalInfo.branch + this.myForm.value.personalInfo.academicYear + this.myForm.value.personalInfo.batch).toUpperCase();
    console.log(collectionName)
    this.studentsCollection = this.afs.collection(collectionName)
    this.students = this.studentsCollection.valueChanges()
    try{
      console.log(collectionName)
      this.afs.collection(collectionName).doc(this.myForm.value.personalInfo.grNo).set(this.myForm.value);
      this.success = true;
    }
    catch(err) {
      console.log(err)
    }
  }
}
