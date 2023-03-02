import { storage } from '@/_config/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

//이미지 업로드
export const uploadImage = async (blob: Blob) => {
  try {
    //storage 경로 설정
    const storageRef = ref(
      storage,
      `post/${generateName()}.${blob.type.substring(6, 10)}`
    );
    //storage 저장
    const snapshot = await uploadBytes(storageRef, blob);
    //url 가져오기
    const result = await getDownloadURL(storageRef);
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
};

//랜덤 텍스트 생성
const generateName = () => {
  //랜덤 숫자를 36진수로 문자열 변환
  const randomText = Math.random().toString(36).substring(2, 10);
  const date = new Date();
  const randomName = `${randomText}_${date.getDate()}_${date.getHours()}_${date.getMinutes()}_${date.getSeconds()}`;

  return randomName;
};
