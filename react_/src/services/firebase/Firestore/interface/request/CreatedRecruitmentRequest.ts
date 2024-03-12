export interface CreatedRecruitmentFrirestoreRequest {
    id: string;
    groupId: string;
    title: string;
    recruitment_details: string;
    deadline: string,
    image: File | string,
    isPublic: boolean,
}
