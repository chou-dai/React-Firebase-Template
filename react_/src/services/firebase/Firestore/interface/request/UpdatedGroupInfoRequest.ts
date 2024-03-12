export interface UpdateGroupInfoFirestoreRequest {
    id: string;
    name: string;
    publicEmail: string;
    category1: string,
    category2: string,
    schoolName: string,
    memberCount: string,
    activityLocation: string,
    activityFrequency: string,
    membershipFee: string,
    introduction: string,
    homepage: string,
    instagram: string,
    twitter: string,
    facebook: string,
    backgroundImage: File | string,
    iconImage: File | string 
}