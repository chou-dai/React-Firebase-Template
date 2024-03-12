import { db } from "../../../config/firebase";
import { storage } from "../../../config/firebase";
import { collection, addDoc, getDocs, where, query, setDoc, doc } from "firebase/firestore";
import { GroupInfoFirestoreResponse } from "./interface/response/GroupInfoResponse";
import { CreatedGroupFirestoreRequest } from "./interface/request/CreatedGroupRequest";
import { UpdateGroupInfoFirestoreRequest } from "./interface/request/UpdatedGroupInfoRequest";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { UpdateGroupCategoryFirestoreRequest } from "./interface/request/UpdatedGroupCategoryRequest";
import { UpdateGalleryFirestoreRequest } from "./interface/request/UpdateGalleryRequest";
import { CreatedRecruitmentFrirestoreRequest } from "./interface/request/CreatedRecruitmentRequest";


// 団体をfirestoreから取得（認証IDで検索して取得）
export const getGroupInfoFromFirestore = async(authId: string) => {
    let groupInfo: GroupInfoFirestoreResponse;
    const q = query(collection(db, "groups"), where("authId", "==", authId));
    await getDocs(q).then((snapShot) => {
        snapShot.forEach((docs) => {
            groupInfo = docs.data() as GroupInfoFirestoreResponse;
            // firestoreのIDを格納
            groupInfo.id = docs.id;
        });
    }).catch(() => alert("団体の取得に失敗しました。"));
    return groupInfo!;
};

// 新しい団体をfirestoreに保存
export const saveNewGroupToFirestore = async(data: CreatedGroupFirestoreRequest) => {
    const groupsCollectionRef = collection(db, "groups");
    await addDoc(groupsCollectionRef, {
        authId: data.authId,
        name: data.name,
        mail: data.mail,
    }).catch(() => alert("既存のメールアドレスです。"));
};

// 団体情報の更新
export const updateGroupInfo = async (data: UpdateGroupInfoFirestoreRequest) => {
    const groupDocRef = doc(db, "groups", data.id);

    // Firebase Storageに画像をアップロードし、URLを取得する関数
    const uploadImageAndGetURL = async (image: File, path: string): Promise<string> => {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, image);
        return getDownloadURL(snapshot.ref);
    };

    try {
        // backgroundImageがFileオブジェクトの場合、アップロード処理を行う
        if (data.backgroundImage instanceof File) {
            const backgroundImageURL = await uploadImageAndGetURL(data.backgroundImage, `groups/${data.id}/backgroundImage`);
            data.backgroundImage = backgroundImageURL;
        }

        // iconImageがFileオブジェクトの場合、アップロード処理を行う
        if (data.iconImage instanceof File) {
            const iconImageURL = await uploadImageAndGetURL(data.iconImage, `groups/${data.id}/iconImage`);
            data.iconImage = iconImageURL;
        }

        // Firestoreにデータを更新
        await setDoc(groupDocRef, data, { merge: true });
        alert("団体情報を更新しました");
    } catch (error) {
        console.error("団体情報の更新に失敗しました: ", error);
        alert("エラーが出ました");
    }
};

//団体カテゴリの更新
export const updateGroupCategory = async (data: UpdateGroupCategoryFirestoreRequest) => {
    const groupDocRef = doc(db, "groups", data.id);
    try{
        // Firestoreにデータを更新
        await setDoc(groupDocRef, data, { merge: true });
        alert("団体情報を更新しました");
    } catch (error) {
        console.error("団体情報の更新に失敗しました: ", error);
        alert("エラーが出ました");
    }
};

//団体ギャラリーの更新
export const updateGallery = async (data: UpdateGalleryFirestoreRequest) => {
    const groupDocRef = doc(db, "groups", data.id);

    // Firebase Storageに画像をアップロードし、URLを取得する関数
    const uploadImageAndGetURL = async (image: File, path: string): Promise<string> => {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, image);
        return getDownloadURL(snapshot.ref);
    };

    try {
        // backgroundImageがFileオブジェクトの場合、アップロード処理を行う
        if (Array.isArray(data.gallery)) {
            const galleryURLs = await Promise.all(data.gallery.map(async (file) => {
                if (file instanceof File) {
                    // ランダムな値を生成
                    const randomValue = crypto.getRandomValues(new Uint8Array(8)).reduce((acc, i) => acc + ('0' + i.toString(16)).slice(-2), '');
                    return await uploadImageAndGetURL(file, `groups/${data.id}/gallery${randomValue}`);
                } else if (typeof file === 'string') {
                    // fileがstring型の場合、そのままfileを返す
                    return file;
                }
            })).then(results => results.filter((url): url is string => url !== undefined));

            data.gallery = galleryURLs;
        }
        // Firestoreにデータを更新
        console.log(data.gallery)
        await setDoc(groupDocRef, data, { merge: true });
        alert("団体情報を更新しました");
    } catch (error) {
        console.error("団体情報の更新に失敗しました: ", error);
        alert("エラーが出ました");
    }
};


// 募集情報の作成
export const createRecruitment = async (data: CreatedRecruitmentFrirestoreRequest) => {
    const recruitmentCollectionRef = collection(db, "recruitment");

    // Firebase Storageに画像をアップロードし、URLを取得する関数
    const uploadImageAndGetURL = async (image: File, path: string): Promise<string> => {
        const storageRef = ref(storage, path);
        const snapshot = await uploadBytes(storageRef, image);
        return getDownloadURL(snapshot.ref);
    };

    try {
        // Firestoreにデータを追加
        const imageData = data.image; // 画像ファイルデータを保持
        data.image = ""; // File型だとaddDocできないため
        const docRef = await addDoc(recruitmentCollectionRef, data); // idを取得するためのaddDoc
        const dataId = docRef.id;
        data.id = dataId;

        // imageがFileオブジェクトの場合、アップロード処理を行う
        if (imageData instanceof File) {
            const imageURL = await uploadImageAndGetURL(imageData, `recruitment/${dataId}/image`);
            data.image = imageURL;
        }

        // idとimageURLを更新
        const recruitmentDocRef = doc(db, "recruitment", dataId);
        await setDoc(recruitmentDocRef, data, { merge: true });
        alert("募集情報を追加しました");
    } catch (error) {
        console.error("募集情報の追加に失敗しました: ", error);
        alert("募集情報の追加に失敗しました");
    }
};