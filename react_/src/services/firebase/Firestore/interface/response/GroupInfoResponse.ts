export interface GroupInfoFirestoreResponse {
    id: string;
    authId: string;
    name: string;
    mail: string;
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
    backgroundImage: string,
    iconImage: string,
    activityStyleTags: string[],
    activityLocationTags: string[],
    genreTags: string[],
    memberCountTag: string,
    activityFrequencyTag: string,
    gallery: string[]
}