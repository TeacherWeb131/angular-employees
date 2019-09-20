import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Employee } from "./employee";

@Injectable({
  providedIn: "root"
})
export class EmployeeService {
  URLAPI = "http://5d80cd5899f8a20014cf99d5.mockapi.io/employees";

  constructor(private http: HttpClient) {}

  getEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.URLAPI);
  }

  getEmployee(id: number): Observable<Employee> {
    return this.http.get<Employee>(this.URLAPI + "/" + id);
  }

  public update(employee: Employee) {
    return this.http.put(this.URLAPI + "/" + employee.id, employee);
  }

  public create(employee: Employee) {
    return this.http.post(this.URLAPI, employee);
  }

  public delete(id: number) {
    return this.http.delete(this.URLAPI + "/" + id);
  }
}
