//it is used for converting files to base64 Strings
import DataUriParser from "datauri/Parser"
import path from "path";

const getDataUri = (file)=>{
    const Parser = new DataUriParser();
    const extName = path.extname(file.originalname).toString();
    return Parser.format(extName,file.buffer);
}

export default getDataUri;