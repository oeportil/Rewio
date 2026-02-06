import { message } from "antd";
import type { Toptions } from "../types";

const useNotification = () => {
    const [messageApi, contextHolder] = message.useMessage();

    const showNotification = (options: Toptions) => {
        messageApi.open({
            type: options.type,
            content: options.content,
        });
    };

    return {
        contextHolder,
        showNotification
    }
}

export default useNotification