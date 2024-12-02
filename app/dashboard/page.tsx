import { signOut } from "@/app/utils/auth";
import { requireUser } from "@/app/utils/hooks";

const DashboardPage = async () => {
  const session = await requireUser();

  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default DashboardPage;
