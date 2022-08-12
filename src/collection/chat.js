import axios from "../axios";

export const FindMessages = async (form, state) => {
    try {

        const res = await axios.get(`/chat/find/message/${form.from}/${form.to}`)
        console.log("chats", res.data);
        if (res.status == 200) {
            state(res.data.messages)
        }
    } catch (error) {
        console.log(error);
    }
}
export const AddMessage = async (form,state) => {
    try {
        const res = await axios.post('/chat/add-message', form)
        console.log(res.data);
        if(res.status==200){
            return
        }
    } catch (error) {
        console.log(error);
    }
}