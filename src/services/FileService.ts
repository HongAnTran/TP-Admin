import ServiceAPI from "./index";


const URL: string = "/file/upload";
const serviceAPI = new ServiceAPI(URL);


export default {

  upload: async(file:FormData)=>{
    return  await serviceAPI.add(file ,{
    })
  }
};