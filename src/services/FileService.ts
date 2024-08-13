import ServiceAPI from "./index";


const URL: string = "/file/upload";
const serviceAPI = new ServiceAPI(URL);


export default {

  upload: async(file:any)=>{
    return  await serviceAPI.add(file)
  }
};