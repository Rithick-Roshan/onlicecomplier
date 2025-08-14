import axios from 'axios';
import { LANGUAGE_VERSION } from './constans';

const API = axios.create({
    baseURL: 'https://emkc.org/api/v2/piston'
});

export const runCode = async (language, code,input) =>{
    const formattedInput = input.split(" ").join("\n");
    console.log(formattedInput);
    const response = await API.post('/execute', {
    "language": language,
   "version": LANGUAGE_VERSION[language],
   "files": [{
      "content": code,
  },
  ],
  "stdin": formattedInput,
});

return response.data;
}