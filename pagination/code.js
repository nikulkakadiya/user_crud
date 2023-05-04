/*


exports.getAllSubject = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1; // Set the default page number to 1
  const limit = req.query.limit || 5; // Set the default limit to 10

  const count = await Subject.countDocuments(); // Get the total number of documents in the collection
  const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const result = await Subject.find({}, { _id: 1, name: 1, courseName: 1 })
    .skip(skip)
    .limit(limit);

  // Calculate links to the previous and next pages
  const prevPage = page > 1 ? `/subjects?page=${page - 1}&limit=${limit}` : null;
  const nextPage = page < totalPages ? `/subjects?page=${page + 1}&limit=${limit}` : null;

  res.status(200).json({
    status: "success",
    result,
    currentPage: page,
    totalPages,
    totalResults: count,
    firstPage: `/subjects?page=1&limit=${limit}`,
    nextPage,
    prevPage
  });
});


exports.getAllSubject = catchAsync(async (req, res, next) => {
  const page = req.query.page || 1; // Set the default page number to 1
  const limit = req.query.limit || 5; // Set the default limit to 10

  const count = await Subject.countDocuments(); // Get the total number of documents in the collection
  const totalPages = Math.ceil(count / limit); // Calculate the total number of pages

  const skip = (page - 1) * limit; // Calculate the number of documents to skip

  const result = await Subject.find({}, { _id: 1, name: 1, courseName: 1 })
    .skip(skip)
    .limit(limit);

  res.status(200).json({
    status: "success",
    result,
    currentPage: page,
    totalPages,
    totalResults: count,
  });
});


import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubjectService {
  private readonly apiUrl = 'http://localhost:3000/api/subjects';

  constructor(private http: HttpClient) { }

  getSubjects(page: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString());

    return this.http.get(this.apiUrl, { params });
  }
}


import { Component, OnInit } from '@angular/core';
import { SubjectService } from '../subject.service';

@Component({
  selector: 'app-subject-list',
  templateUrl: './subject-list.component.html',
  styleUrls: ['./subject-list.component.css']
})
export class SubjectListComponent implements OnInit {
  currentPage = 1;
  totalPages = 1;
  totalResults = 0;
  subjects = [];

  constructor(private subjectService: SubjectService) { }

  ngOnInit(): void {
    this.getSubjects();
  }

  getSubjects(): void {
    this.subjectService.getSubjects(this.currentPage, 10)



*/
