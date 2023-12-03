export const emailCheck = (email: string | number): boolean => {
  const emailString = String(email); // 명시적으로 문자열로 변환

  const SignUpCheck =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

  return SignUpCheck.test(emailString);
};
  
  export const nicknameCheck = (nickname:string | number): boolean => {
    const nicknameString = String(nickname)
    const SignUpCheck = /^[0-9a-zA-Zㄱ-ㅎ|ㅏ-ㅣ|가-힣]{3,15}$/;
  
    return SignUpCheck.test(nicknameString);
  };
  
  export const passwordCheck = (password:string) => {
    const SignUpCheck =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
  
    return SignUpCheck.test(password);
  };
  