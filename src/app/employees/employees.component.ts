import { Component, OnInit } from "@angular/core";
import { Employee } from "../employee";
import { EmployeeService } from "../employee.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.component.html",
  styleUrls: ["./employees.component.css"]
})
export class EmployeesComponent implements OnInit {
  employees: Employee[] = [];

  constructor(private service: EmployeeService) {}

  ngOnInit() {
    this.service
      .getEmployees()
      .subscribe(apiEmployees => (this.employees = apiEmployees));
  }

  handleDelete(id) {
    this.service.delete(id).subscribe(
      () => {
        const index = this.employees.findIndex(e => e.id === id);
        this.employees.splice(index, 1);
      },
      () => {
        console.log("Ca a merdé");
      }
    );
  }
}
