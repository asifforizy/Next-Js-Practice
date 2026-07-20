import { Button } from "@/components/ui/button";
import { getMe } from "@/service/getMe";


export default async function HomePage() {

  const user = await getMe()
  console.log(user)
  return (
    <div >
     
      <p>This is home page</p>
      <Button>hello world</Button>
    </div>
  );
}
