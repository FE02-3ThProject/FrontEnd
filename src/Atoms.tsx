import { atom } from 'recoil';
import defaultimage from "../src/images/default_profile.png"

//채팅룸 상태값
export const roomIdStates = atom({
    key: 'roomIdStates',
    default: [],
});

export const roomIdListStates = atom({
    key: 'roomIdListStates',
    default: [],
});

export const roomMsgStates = atom({
    key: 'roomMsgStates',
    default: [],
});

export const roomInfoStates = atom({
    key: 'roomInfoStates',
    default: [],
});

export const reloadChatStates = atom({
    key: 'reloadChatStates',
    default: false,
});

//유저 아이디 상태값
export const userEmailState = atom({
    key: 'userEmailState',
    default: {
        userEmail: '',
        userNickName: ''
    }
})

export const userNicknameState = atom({
    key: 'userNicknameState',
    default: {
        userNickname: ''
    }
})

export const userIdState = atom({
    key: 'userIdState',
    default: '',
})

export const isLoggedInState = atom({
    key: 'isLoggedInState',
    default: false,
})

//유저 프로필 사진
export const profileImageState = atom({
    key: 'profileImageState',
    default: defaultimage,
  });