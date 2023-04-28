import axios from "@/core/axios";
import { LoginFormDTO, LoginResponseDTO } from "./dto/auth.dto";

export const login = async (values: LoginFormDTO): Promise<LoginResponseDTO> => {
    const { data } = await axios.post('/auth/login', values)

    return data;
}