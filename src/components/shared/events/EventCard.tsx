import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { useCookies } from "react-cookie";
import toast from "react-hot-toast";
import { Eye, EyeOff } from 'lucide-react';

interface EventCardProps {
  slug: string;
  name: string;
  image_url: string;
  location?: string;
  isPrivate: boolean;
  idEvent: string;
}

export function EventCard({
  slug,
  name,
  image_url,
  isPrivate,
  idEvent
  }: EventCardProps) {

  const [cookies, setCookie] = useCookies(['token', 'tokenEvent']);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [password, setPassword] = useState<string>('');


  const token = cookies.token;
  const navigate = useNavigate();
  
  const handlerGetToken = async (password: string) => {
    try{
    const response = await api.post(`/events/${idEvent}/verify-password`, {password: password}, {
    })
    const { token : tokenEvent } = response.data;
    setCookie('tokenEvent', tokenEvent, { path: '/' });
    toast.success('Senha correta!')
    navigate(`/eventos/${slug}`)
    }catch(error){
      toast.error('Senha incorreta!')
    }
    }

    if(!token){
      navigate('/sign-in')
    }

  return (
    <>
      {isPrivate != true ? (
        <Link
          to={`/eventos/${slug}`}
          className="flex h-fit flex-col overflow-hidden rounded-md border shadow-md "
        >
          <img
            className="rounded-t-md transition-transform duration-300 hover:scale-110  aspect-video"
            src={image_url}
            alt={name}
          />
          <div className="p-3">
            <h1 className="text-lg font-semibold leading-tight min-h-11 max-h-11 overflow-hidden overflow-ellipsis line-clamp-2">
              {name}
            </h1>
          </div>
        </Link>
      ) : (
        
          <Dialog>
            <DialogTrigger>
              <div className="flex h-fit flex-col overflow-hidden rounded-md border shadow-md ">
                <img
                  className="rounded-t-md transition-transform duration-300 hover:scale-110  aspect-video"
                  src={image_url}
                  alt={name}
                />
                <div className="p-3">
                  <h1 className="text-lg font-semibold leading-tight min-h-11 max-h-11 overflow-hidden overflow-ellipsis line-clamp-2">
                    {name}
                  </h1>
                </div>
              </div>
            </DialogTrigger>
           
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Este evento é privado!</DialogTitle>
                <DialogDescription>
                  Digite a senha do evento:
                  <Input className={` border-stone-500 focus:!ring-purple-500`} type={isVisiblePassword ? 'text' : 'password'} onChange={(e) => setPassword(e.target.value)}/>
                  <button
                    className="absolute right-8 top-[40%] text-gray-700"
                    type="button"
                    onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                  >
                    {isVisiblePassword ? (
                      <Eye className="h-6 w-6" />
                    ) : (
                      <EyeOff className="h-6 w-6" />
                    )}
                </button>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button type="submit" onClick={() =>
                    {handlerGetToken(password)}
                }> Enviar 
                
                </Button>
              </DialogFooter>
            </DialogContent>
           
          </Dialog>
        
      )}
    </>
  );
}


