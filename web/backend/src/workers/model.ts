


export interface UserModel {
    UserID: string;
    Username: string;
    Password: string;
    Email: string;
    PhoneNumber: string;
    WANumber: string;
    // AccStatus: string;
    // RoleID: string;
}

export interface UserRole {
    RoleID: number;
    RoleName: string;
    Description: string;
    Permissions: Array<number>;
}

export interface CaseReportingModel {
    ReportID: string;
    ReportDate: Date;
    crimeType: number;
    IncidentDate: Date;
    IncidentLoc: string;
    UserID: string;
    EvidenceDoc: string;
    EvidenceDesc: string;
    SuspeciousDocs: string;
    SuspeciousDesc: string;
    Anonymity: boolean;
}

export interface CaseTrackingModel {
    CaseID: string;
    CurrentStatus: number;
    userID: string;
    DateOpen: Date;
    DateClose?: Date;
    ProcessDocs: Array<string>;
}

export interface EvidenceModel {
    UserID: string;
    EvidenceID: string;
    CaseID: string;
    CaseDesc: string;
    EvidenceDesc: string;
    EvidenceDocs: string;
    EvidenceLoc: string;
    UploadEvidence: string;
    dateSubmitted: any;
    descEvidence: string;
    anonymity: any;
}

export interface ChallanModel {
    ChallanID: string;
    Reason: string;
    VHNo: string;
    ViolationProof: Array<string>;
    ViolationPlace: string;
    IssueDate: Date;
    PersonalID: string;
    PoliceStation: string;
    UserID: string;
    Due: number;
    CaseID: string;
}
