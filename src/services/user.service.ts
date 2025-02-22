import { toast } from 'react-toastify';
import api from './api.service';
import { User } from '@/models/user.model';
import { CreateUserDto } from '@/DTO/create-user.dto';

export const checkEmailExistsService = async (email:string): Promise<boolean> => {
    try{
        await api.get(`/user/check-email?email=${email}`);
        return false;
    }catch(error:any){
        if(error.response && error.response.status === 400){
            toast.error(error.response.data.message);
            return true;
        }
        console.log(error.response.data.message);
        throw new Error('Erro ao verificar email: ' + error.response.data.message  + ' - ' + error.response.status);
    }
};



export const createUserService = async (userDTO:CreateUserDto): Promise<User> => {
    try{
        const response = await api.post('/user/create-user', userDTO);
        return response.data;
    }catch(error:any){
        if(error.response && error.response.status === 400){
            toast.error(error.response.data.message);
        }
        console.log(error.response.data.message);
        throw new Error('Erro ao criar usuário: ' + error.response.data.message  + ' - ' + error.response.status);
    }
} 