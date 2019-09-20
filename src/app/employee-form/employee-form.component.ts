import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";
import { FormGroup, FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.css"]
})
export class EmployeeFormComponent implements OnInit {
  employee: Employee;
  form: FormGroup;

  constructor(
    private service: EmployeeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");

    if (id != "new") {
      this.service.getEmployee(+id).subscribe(apiEmployee => {
        this.employee = apiEmployee;
        this.initializeForm();
      });
    }

    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      firstName: new FormControl(""),
      lastName: new FormControl(""),
      email: new FormControl("")
    });

    if (this.employee) {
      this.form.setValue({
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email
      });
    }
  }

  handleSubmit() {
    if (!this.employee) {
      // Création
      this.service.create(this.form.value).subscribe(
        () => {
          console.log("Bravo");
          this.router.navigateByUrl("/");
        },
        () => {
          console.log("Merde");
        }
      );

      return;
    }

    // Update
    this.service.update({ ...this.employee, ...this.form.value }).subscribe(
      () => {
        console.log("Mise à jour ok");
        this.router.navigateByUrl("/");
      },
      () => {
        console.log("Mise à jour pas ok");
      }
    );
  }
}
