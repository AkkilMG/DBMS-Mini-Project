


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
    CaseID: string;
    ReportDate: any;
    CrimeType: string;
    IncidentDate: any;
    IncidentLoc: string;
    UserID: string;
    EvidenceDoc: string;
    EvidenceDesc: string;
    SuspeciousDocs: string;
    SuspeciousDesc: string;
    Anonymity: any;
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
    Anonymity: any;
}
