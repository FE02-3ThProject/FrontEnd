import styled from "styled-components";
import { RiSendPlaneLine } from "react-icons/ri";
import { IoImageOutline } from "react-icons/io5";
import { CgClose } from "react-icons/cg";

import { FormEvent, useRef, useState } from "react";
import useSWRMutation from "swr/mutation";
import uploadImage from "../../helpers/uploadImage";
import previewImage from "../../helpers/previewImage";

interface IInputProps {
  receiverId: string;
  currentUserId: string;
}

async function sendRequest(
  url: string,
  {
    arg,
  }: {
    arg: {
      text: string;
      image: string;
      receiverId: string;
      senderId: string;
    };
  }
) {
  return fetch(url, {
    method: "POST",
    body: JSON.stringify(arg),
  }).then((res) => res.json());
}

const Input = ({ receiverId, currentUserId }: IInputProps) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [image, setImage] = useState<File | null>(null);
  const imageRef = useRef<HTMLInputElement>(null);

  const [message, setMessage] = useState<string>("");
  const { trigger, isMutating } = useSWRMutation(
    "/api/chat",
    sendRequest /* options */
  );

  const chooseImage = () => {
    imageRef.current?.click();
  };

  const removeImage = () => {
    setImagePreview(null);
    setImage(null);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const imgUrl = image ? await uploadImage(image as File) : null;

    if (message || imgUrl) {
      try {
        trigger({
          text: message,
          image: imgUrl,
          receiverId: receiverId,
          senderId: currentUserId,
        });
        // await axios.post("/api/chat", {
        //   text: message,
        //   image: imgUrl,
        //   receiverId: receiverId,
        //   senderId: currentUserId,
        // });
      } catch (error) {
        console.log(error);
      }
    }

    setMessage("");
    setImagePreview(null);
    setImage(null);
  };

  return (
    <StForm onSubmit={handleSubmit}>
      {imagePreview && (
        <StImagePreview>
          <img src={imagePreview} alt="" />
          <StRemoveImageButton onClick={removeImage}>
            <CgClose />
          </StRemoveImageButton>
        </StImagePreview>
      )}

      <StTextInput
        type="text"
        placeholder="메시지를 입력해주세요."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <StImageInput
        type="file"
        onChange={(e) => previewImage(e, setImagePreview, setImage)}
        ref={imageRef}
        accept="image/*"
        multiple={false}
      />

      <StChooseImageButton onClick={chooseImage}>
        <IoImageOutline />
      </StChooseImageButton>
      <StSubmitButton type="submit" disabled={isMutating}>
        <RiSendPlaneLine className="text-white" />
      </StSubmitButton>
    </StForm>
  );
};

export default Input;

const StForm = styled.form`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 100%;
  gap: 4px;
  padding: 2px 4px;
  border: 1px solid gray;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StImagePreview = styled.div`
  position: absolute;
  right: 0;
  width: 100%;
  overflow: hidden;
  border-radius: 4px;
  max-width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const StRemoveImageButton = styled.span`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  font-size: 24px;
  color: white;
  background: gray;
  cursor: pointer;
  top: 4px;
  right: 4px;
  border-radius: 50%;
  opacity: 0.6;
  &:hover {
    opacity: 1;
  }
`;

const StTextInput = styled.input`
  width: 100%;
  font-size: 16px;
  outline: none;
`;

const StImageInput = styled.input`
  display: none;
`;

const StChooseImageButton = styled.div`
  font-size: 24px;
  color: gray;
  cursor: pointer;
`;

const StSubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2px;
  font-size: 24px;
  color: white;
  background: orange;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background: darkorange;
  }
  &:disabled {
    opacity: 0.6;
  }
`;
