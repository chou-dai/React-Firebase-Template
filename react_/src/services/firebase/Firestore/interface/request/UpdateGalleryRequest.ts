export interface UpdateGalleryFirestoreRequest {
    id: string;
    gallery: File[] | string[],
}