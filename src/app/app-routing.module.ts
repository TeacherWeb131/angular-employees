import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EmployeesComponent } from "./employees/employees.component";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";

const routes: Routes = [
  { path: "employees", component: EmployeesComponent },
  { path: "employees/:id", component: EmployeeFormComponent },
  { path: "", redirectTo: "/employees", pathMatch: "full" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
