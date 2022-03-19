import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/shared/api.service';
import { PagerService } from 'src/app/shared/pager.service';
import { EmployeeModel } from '../model/employee.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  formValue !:FormGroup;
  employeeModelObj:EmployeeModel=new EmployeeModel();
  employeeData !:any;
  showAdd!: boolean;
  showUpdate!: boolean;
  pager: any = {};
  pagedItems: any;
  serach:any;
  fullName="";

  constructor(private formBuilder:FormBuilder, private api:ApiService,  private pagerService: PagerService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      fullName:['',[Validators.required]],
      company:['',[Validators.required]],
      position:['',[Validators.required]],
      address:['',[Validators.required]],
      mobile:['',[Validators.required]],
      gender:['',[Validators.required]],
      email:['',[Validators.required]],
      dob:['',[Validators.required]]
    });
    this.getAllEmployee();
    this.setPage(1);

  }

  postEmployeeDetails(){
    this.employeeModelObj.fullName= this.formValue.value.fullName;
    this.employeeModelObj.position= this.formValue.value.position;
    this.employeeModelObj.company= this.formValue.value.company;
    this.employeeModelObj.address= this.formValue.value.address;
    this.employeeModelObj.mobile= this.formValue.value.mobile;
    this.employeeModelObj.gender= this.formValue.value.gender;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.dob= this.formValue.value.dob;

    this.api.postEmployee(this.employeeModelObj).subscribe((resp)=>{
      console.log(resp);
      this.formValue.reset();
      let ref=document.getElementById('cancel');
      ref?.click();
      this.getAllEmployee();
      alert("Added record")
    }) 
  }

  getAllEmployee(){
    this.api.getEmployee().subscribe((resp:any)=>{
      this.employeeData=resp;
      this.setPage(1);
    })
  }

  deleteEmployee(row:any){
    this.api.deleteEmployee(row.id).subscribe((resp:any)=>{
      if(confirm("Are you sure to delete ")) {

  this.getAllEmployee();
      }
    })
  }

  onEdit(row:any){
    this.employeeModelObj.id=row.id;
    this.formValue.controls['fullName'].setValue(row.fullName);
    this.formValue.controls['position'].setValue(row.position);
    this.formValue.controls['company'].setValue(row.company);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['mobile'].setValue(row.mobile);
    this.formValue.controls['gender'].setValue(row.gender);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['dob'].setValue(row.dob);
  }

  updateEmployeeDetails(){
    this.employeeModelObj.fullName= this.formValue.value.fullName;
    this.employeeModelObj.position= this.formValue.value.position;
    this.employeeModelObj.company= this.formValue.value.company;
    this.employeeModelObj.address= this.formValue.value.address;
    this.employeeModelObj.mobile= this.formValue.value.mobile;
    this.employeeModelObj.gender= this.formValue.value.gender;
    this.employeeModelObj.email= this.formValue.value.email;
    this.employeeModelObj.dob= this.formValue.value.dob;


    this.api.updateEmployee(this.employeeModelObj,this.employeeModelObj.id).subscribe(resp=>{
      alert("Updated record");
      
      let ref=document.getElementById('cancel');
      ref?.click();
      this.getAllEmployee();
    })
  }

  clickAddEmployee(){
    this.formValue.reset();
    this.showAdd= true;
    this.showUpdate= false;
  }

  clickEditEmployee(){
    this.formValue.reset();
    this.showUpdate= true;
    this.showAdd= false;
  }

  setPage(page: number) {
    if (this.pager) {
      if (page < 1 || page > this.pager.totalPages) {
        return;
      }
    }

    this.pager = this.pagerService.getPager(this.employeeData?.length, page, true, 15);
    console.log('pager', this.pager);

    if(this.employeeData && this.pager)
    this.pagedItems = this.employeeData.slice(this.pager?.startIndex, this.pager?.endIndex + 1);
    console.log('pagedItems', this.pagedItems);
  }

  setItem(item: any) {
    this.employeeData = item.fullName;
  }
}
