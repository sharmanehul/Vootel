import { configureStore} from "@reduxjs/toolkit";
import conversationSlice from "./conversationSlice";
import userSlice from "./userSlice";

const appStore = configureStore({
    reducer: {
        conversation: conversationSlice,
        user: userSlice
    }
});

export default appStore;