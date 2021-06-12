import AppOverview from "@/components/AppOverview";
import Welcome from "@/components/Welcome";
import { useRouter } from "next/router";

function AlternateHomePage() {
  const router = useRouter();

  console.log(router.query.id);

  const imgPath =
    router.query.id === "ALeKk00ErtDO57453vZu3qIWxu7Ss5OY6w"
      ? "/Images/bg-phone-portrait-south2.jpg"
      : router.query.id === "ALeKk01_r8NWKTyvkD0mTQaub5h5JjeiZg"
      ? "/Images/bg-phone-portrait-south2.jpg"
      : null;
  return (
    <>
      <Welcome showImage={true} imgPath={imgPath} />
      <AppOverview />
    </>
  );
}

export default AlternateHomePage;
