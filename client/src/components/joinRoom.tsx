"use client"
import { FC, useState } from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { KeyRound } from 'lucide-react'
import axios from 'axios'
import { useGlobalContext } from '@/app/Context/store'
import { useRouter } from 'next/navigation'

interface joinRoomProps {
  
}

const JoinRoom: FC<joinRoomProps> = ({}) => {

const { roomHandler , setRoomHandler } = useGlobalContext();

const [joinRoomEmail, setJoinRoomEmail] = useState<string>("")
const [joinRoom, setJoinRoom] = useState<string>("")
const [joinOtp, setJoinOtp] = useState<number>(0)

const router = useRouter();



const getVerified = async (e:React.FormEvent) =>{
  e.preventDefault();
  try {
    console.log("first")
  await axios
    .post("http://localhost:5000/otp/getRoom", {
      email: joinRoomEmail,
      rooms: joinRoom,
      otp: joinOtp,
    })
    .then((data) => {
      console.log(data)
      router.push(`http://localhost:3000/privateSession/${joinRoom}`);
    })
    .catch((e) => {
      console.log(e);
    });
  } catch (error) {
    console.log(error)
  }
}
    
  return (
    <div>
      <div >
      <h1 className="text-3xl mb-6 mt-5 font-bold ">
        Join Room...
      </h1>
        <form className="flex gap-2" action="" onSubmit={getVerified}>
          <Input
            value={joinRoomEmail}
            onChange={({ target }) => setJoinRoomEmail(target.value)}
            className="bg-white min-w-48"
            placeholder="Enter email here..."
          />
          <Input
            value={joinRoom}
            onChange={({ target }) => setJoinRoom(target.value)}
            className="bg-white min-w-48"
            placeholder="Enter topic here..."
          />
          <Input
            value={joinOtp}
            onChange={({ target }) => setJoinOtp(parseInt(target.value))}
            className="bg-white min-w-48"
            placeholder="Enter topic here..."
          />
          <Button
          // disabled={isPending}
          // onClick={() => mutate({ topicName: input })}
          type='submit'
          >
            Join Room
            <span className="ml-1">
              <KeyRound size={18} />
            </span>
          </Button>
        </form>
      </div>
    </div>
  );
}

export default JoinRoom