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
    const prevPage = page > 1 ? `/subject/findSubject?page=${page - 1}&limit=${limit}` : null;
    const nextPage = page < totalPages ? `/subject/findSubject?page=${+page+1}&limit=${limit}` : null;

    res.status(200).json({
        status: "success",
        result,
        currentPage: page,
        totalPages,
        totalResults: count,
        firstPage: `/subject/findSubject?page=1&limit=${limit}`,
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


    ******************************** OTP CODE*****************************
    const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const twilio = require("twilio");
const otpDataStore = {};

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.post("/send-otp", (req, res) => {
  const { phoneNumber } = req.body;

  if (!phoneNumber) {
    return res.status(400).send({ message: "Phone number is required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000);
  const message = `Your OTP is ${otp}`;

  const accountSid = "AC37c3a84b35b9df50c49c5722b0d0a978";
  const authToken = "b1040f0684b952f54fea49757d9dea52";
  const client = twilio(accountSid, authToken);

  client.messages
    .create({
      body: message,
      from: "+15855342532",
      to: phoneNumber,
    })
    .then(() => {
      // Store the OTP and its expiry time in memory
      const otpData = {
        phoneNumber,
        otp,
        expiryTime: new Date().getTime() + 10 * 60 * 1000, // Expiry time is 10 minutes from now
      };
      otpDataStore[phoneNumber] = otpData;
      console.log(otpDataStore[phoneNumber]);
      res.send({ message: "OTP sent successfully" });
    })
    .catch((error) => {
      console.log(error);
      res.status(500).send({ message: "Failed to send OTP" });
    });
});

app.post("/verify-otp", (req, res) => {
  const { phoneNumber, otp } = req.body;
  if (!phoneNumber || !otp) {
    return res
      .status(400)
      .send({ message: "Phone number and OTP are required" });
  }

  const otpData = otpDataStore[phoneNumber];
  // console.log(typeof otpData.otp + " " + typeof otp);

  if (!otpData) {
    return res.status(404).send({ message: "OTP not found" });
  }

  if (otpData.otp !== otp) {
    return res.status(401).send({ message: "Invalid OTP" });
  }

  if (new Date().getTime() > otpData.expiryTime) {
    return res.status(401).send({ message: "OTP has expired" });
  }

  // If the OTP is valid and has not expired, delete it from the memory store
  delete otpDataStore[phoneNumber];

  res.send({ message: "OTP verified successfully" });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server ${port}`);
});


*/
