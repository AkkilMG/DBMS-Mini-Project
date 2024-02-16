


export interface User {
    userID: string;
    username: string;
    password: string;
    email: string;
    phoneNumber: string;
    waNumber: string;
    accStatus: string;
    role: string;
}

export interface UserRole {
    roleID: number;
    roleName: string;
    desc: string;
    permissions: Array<number>;
}

export interface CrimeReporting {
    reportID: string;
    crimeType: number;
    dateIncident: Date;
    locIncident: string;
    userID: string;
    evidenceInfo: string;
    anonymity: boolean;
}

export interface CaseTracking {
    reportID: string;
    caseID: string;
    status: number;
    userID: string;
    dateOpen: Date;
    dateClose?: Date;
    progressNote: Array<string>;
}

export interface Evidence {
    userID: string;
    evidenceID: string;
    caseID: string;
    caseDesc: string;
    UploadEvidence: Array<string>;
    dateSubmitted: Date;
    descEvidence: string;
    anonymity: boolean;
}

export interface Challan {
    challanID: string;
    reason: string;
    violationProof: Array<string>;
    violationPlace: string;
    issueDate: Date;
    personalID: string;
    policeStation: string;
    challenge: Array<string>;
    caseID: string;
    due: number;
}
