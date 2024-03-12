export interface UpdateGroupCategoryFirestoreRequest {
    id: string;
    activityStyleTags: string[],
    activityLocationTags: string[],
    genreTags: string[],
    memberCountTag: string,
    activityFrequencyTag: string
}