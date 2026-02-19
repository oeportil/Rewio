import type { Toptions } from "@/types/index";
import { message } from "antd";

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