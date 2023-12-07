import axios from "axios";

const uploadImage = async (image: File) => {
  const url = "/api/upload"; // 서버의 엔드포인트에 맞게 변경해주세요.
  const formData = new FormData();
  formData.append("file", image);

  const response = await axios.post(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  console.log(response.data);
  return response.data.url; // 서버에서 반환하는 응답에 맞게 변경해주세요.
};

export default uploadImage;
